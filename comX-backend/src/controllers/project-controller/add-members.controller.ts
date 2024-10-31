import { Request, Response } from "express"
import { responseCodes } from "../../utils/response-codes"
import { prisma } from "../../config/dbConnect";
export const add_members = async(req: Request, res: Response) =>{
    try{
        const {memberId, projectId, communityId} = req.body;
        const added = await prisma.projectMembers.create({
            data:{
                userId: memberId,
                projectId: projectId,
                communityId: communityId
            }
        })
        return responseCodes.success.ok(res, added, "user added to the project");
    }
    catch(e){
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "internal error occured");
    }
    
}