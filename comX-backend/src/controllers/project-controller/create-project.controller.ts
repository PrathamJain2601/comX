import { Request, Response } from "express"
import { responseCodes } from "../../utils/response-codes"
import { prisma } from "../../config/dbConnect";
export const create_project = async (req: Request, res: Response) =>{
    try{
        const {communityId, name, description, userId, deadline, milestones, members} = req.body;
        
        const project = await prisma.project.create({
            data:{
                name: name,
                description: description,
                communityId: communityId,
                ownerId: userId,
                deadline: deadline,
                milestones: milestones
            }
        })

        const memberData = [
            { communityId: communityId, projectId: project.id, userId: userId },
            ...members.map((memberId: number) => ({
                communityId: communityId,
                projectId: project.id,
                userId: memberId,
            })),
        ]

        await prisma.projectMembers.createMany({
            data: memberData,
            skipDuplicates: true
        })

        return responseCodes.success.created(res, project);
    }
    catch(e){
        console.log(e);
        responseCodes.serverError.internalServerError(res, "some error occurred");
    }
}