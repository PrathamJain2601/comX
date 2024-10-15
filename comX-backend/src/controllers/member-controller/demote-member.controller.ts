import { Request, Response } from "express";
import { isUserMember } from "../../utils/isUserMember";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const demote_member = async (req: Request, res: Response) => {
    try{
        const {userId, communityId, demoting_id} = req.body;
            
        const demoter = await isUserMember(userId, communityId);
        
        if(!demoter){
            return responseCodes.clientError.forbidden(res, 'You are not a member of this community');
        }
        
        if (demoter.role !== 'OWNER' && demoter.role !== 'ADMIN') {
            return responseCodes.clientError.forbidden(res, 'Only owners and admins can demote members');
        }
        
        const member = await isUserMember(demoting_id, communityId);
        
        if(!member){
            return responseCodes.clientError.forbidden(res, 'The person you are trying to promote is not a member of this community');
        }
        
        if (member.role !== 'ADMIN') {
            return responseCodes.clientError.forbidden(res, 'The person you are trying to promote is not an admin');
        }

        const updatedMember = await prisma.communityMember.update({
            where: {
              userId_communityId: {
                userId: demoting_id,
                communityId: communityId
              },
            },
            data: {
              role: 'MEMBER',
            },
        });

        return responseCodes.success.ok(res, updatedMember, "user is demoted");

    }
    catch(error){
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}