import { Request, Response } from "express"
import { prisma } from "../../config/dbConnect";
import { responseCodes } from "../../utils/response-codes";
import { isUserMember } from "../../utils/isUserMember";

export const get_community_details = async (req: Request, res: Response) =>{
    try{
    const { userId } = req.body;
    const communityId = Number(req.params.id);
    const verdict = isUserMember(userId, communityId);
    if(!verdict){
        return responseCodes.clientError.forbidden(res, "You are not a member of community hence not allowed to get details");
    }
    const community = await prisma.community.findUnique({
        where:{
            id: communityId
        }
    })
    responseCodes.success.ok(res, community, "community details fetched");
    }
    catch(error){
        console.log("error getting community details",error);
        responseCodes.serverError.internalServerError(res, "internal server error");
    }
}