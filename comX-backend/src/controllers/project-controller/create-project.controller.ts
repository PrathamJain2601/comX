import { Request, Response } from "express"
import { responseCodes } from "../../utils/response-codes"
import { prisma } from "../../config/dbConnect";
export const create_project = async (req: Request, res: Response) =>{
    try{
        const {communityId, name, description, userId} = req.body;
        const project = await prisma.project.create({
            data:{
                name: name,
                description: description,
                communityId: communityId,
            }
        })

        await prisma.projectMembers.create({
            data:{
                communityId: communityId,
                projectId: project.id,
                userId: userId
            }
        })

        return responseCodes.success.created(res, project);
    }
    catch(e){
        console.log(e);
        responseCodes.serverError.internalServerError(res, "some error occurred");
    }
}