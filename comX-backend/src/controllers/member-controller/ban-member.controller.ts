import { Request, Response } from "express";
import { isUserMember } from "../../utils/isUserMember";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const ban_member = async (req: Request, res: Response) => {
    try{
        const {userId, communityId, baning_id} = req.body;
            
        const user = await isUserMember(userId, communityId);
        
        if(!user){
            return responseCodes.clientError.forbidden(res, 'You are not a member of this community');
        }
        
        if (user.role !== 'OWNER' && user.role !== 'ADMIN') {
            return responseCodes.clientError.forbidden(res, 'Only owners and admins can ban members');
        }
        
        const member = await isUserMember(baning_id, communityId);
        
        if(!member){
            return responseCodes.clientError.forbidden(res, 'The person you are trying to ban is not a member of this community');
        }
        
        if (member.role !== 'MEMBER') {
            return responseCodes.clientError.forbidden(res, 'The person you are trying to ban is not a member');
        }

        const updatedMember = await prisma.communityMember.update({
            where: {
              userId_communityId: {
                userId: baning_id,
                communityId: communityId
              },
            },
            data: {
              role: 'BANNED',
            },
        });

        return responseCodes.success.ok(res, updatedMember, "user is banned");

    }
    catch(error){
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}