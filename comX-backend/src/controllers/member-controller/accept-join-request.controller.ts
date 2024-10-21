import { Request, Response } from "express";
import { isUserMember } from "../../utils/isUserMember";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const accept_join_request = async (req: Request, res: Response) => {
    try{
        const {userId, communityId, member_id} = req.body;
        
        const member = await isUserMember(member_id, communityId);
        
        if(!member || member.role !== 'QUEUE'){
            return responseCodes.clientError.forbidden(res, 'The person you are trying to accept is not in queue');
        }

        const updatedMember = await prisma.communityMember.update({
            where: {
              userId_communityId: {
                userId: member_id,
                communityId: communityId
              },
            },
            data: {
              role: 'MEMBER',
            },
        });

        return responseCodes.success.ok(res, updatedMember, "user is now a member");

    }
    catch(error){
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}