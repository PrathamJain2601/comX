import { Request, Response } from "express";
import { isUserMember } from "../../utils/isUserMember";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const promote_member = async (req: Request, res: Response) => {
    try{
        const {userId, communityId, promoting_id} = req.body;
            
        const promoter = await isUserMember(userId, communityId);
        
        if(!promoter){
            return responseCodes.clientError.forbidden(res, 'You are not a member of this community');
        }
        
        if (promoter.role !== 'OWNER' && promoter.role !== 'ADMIN') {
            return responseCodes.clientError.forbidden(res, 'Only owners and admins can promote members');
        }
        
        const member = await isUserMember(promoting_id, communityId);
        
        if(!member){
            return responseCodes.clientError.forbidden(res, 'The person you are trying to promote is not a member of this community');
        }
        
        if (member.role !== 'MEMBER') {
            return responseCodes.clientError.forbidden(res, 'The person you are trying to promote is not a member');
        }

        const updatedMember = await prisma.communityMember.update({
            where: {
              userId_communityId: {
                userId: promoting_id,
                communityId: communityId
              },
            },
            data: {
              role: 'ADMIN',
            },
        });

        return responseCodes.success.ok(res, updatedMember, "user is promoted");

    }
    catch(error){
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}