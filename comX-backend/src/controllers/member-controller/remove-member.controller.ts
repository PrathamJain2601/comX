import { Request, Response } from 'express';
import { prisma } from '../../config/dbConnect';
import { responseCodes } from '../../utils/response-codes';
import { isUserMember } from '../../utils/isUserMember';

// Remove a member from a community
export const remove_member = async (req: Request, res: Response) => {
  try {
    const { removingId, communityId, userId } = req.body;

    // Check if the user is the owner or an admin of the community
    const member = await isUserMember(userId, communityId);
    
    if (!member) {
      return responseCodes.clientError.forbidden(res, 'You are not a member of this community');
    }

    if (member.role !== 'OWNER' && member.role !== 'ADMIN') {
      return responseCodes.clientError.forbidden(res, 'Only owners and admins can remove members');
    }

    // Find the specific community member to be removed
    const memberToRemove = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: removingId, // The ID of the member to remove
          communityId,
        },
      },
    });

    if (!memberToRemove) {
      return responseCodes.clientError.badRequest(res, 'Member not found in this community');
    }

    // Remove the member from the community
    await prisma.communityMember.delete({
      where: {
        id: memberToRemove.id, // The ID of the member to remove
      },
    });

    return responseCodes.success.ok(res, null, 'Member removed successfully');
  } catch (error) {
    console.error('Error removing member:', error);
    return responseCodes.serverError.internalServerError(res, 'Internal server error');
  }
};
