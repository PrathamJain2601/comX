import { Request, Response } from "express"
import { responseCodes } from "../../utils/response-codes"
import { prisma } from "../../config/dbConnect";
export const add_members = async(req: Request, res: Response) =>{
    try{
        const {members, projectId, communityId} = req.body;
        const memberData = [
            ...members.map((memberId: number) => ({
                communityId: communityId,
                projectId: projectId,
                userId: memberId,
            })),
        ]

        await prisma.projectMembers.createMany({
            data: memberData,
            skipDuplicates: true
        })
        return responseCodes.success.ok(res, "user added to the project");
    }
    catch(e){
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "internal error occured");
    }
    
}