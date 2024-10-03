import { Request, Response } from 'express';
import { prisma } from '../../config/dbConnect';
import { responseCodes } from '../../utils/response-codes';

// Get all communities
export const get_all_communities = async (req: Request, res: Response) => {
  try {
    // Fetch all communities with their members
    const communities = await prisma.community.findMany({
      include: {
        members: true, // Include the members of each community
      },
    });

    // Format the data
    const formattedCommunities = communities.map(community => {
      const memberCount = community.members.length;

      // Exclude id and communityId from members
      const membersWithoutIds = community.members.map(({ id, communityId, ...rest }) => rest);

      // Find the owner
      const owner = community.members.find(member => member.role === 'OWNER');
      const ownerWithoutIds = {...owner, id:undefined, communityId: undefined};

      return {
        ...community,
        members: membersWithoutIds, // Replace members with the modified array
        memberCount, // Add member count to the community data
        owner: ownerWithoutIds // Exclude id and communityId from the owner
      };
    });

    return responseCodes.success.ok(res, formattedCommunities, 'Communities fetched successfully');
  } catch (error) {
    console.error('Error fetching communities:', error);
    return responseCodes.serverError.internalServerError(res, 'Internal server error');
  }
};
