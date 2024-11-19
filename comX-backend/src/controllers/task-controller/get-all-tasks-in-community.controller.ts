import { Request, response, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const get_all_tasks_in_community = async(req: Request, res: Response) => {
    try{
        const { communityId } = req.params;
        const tasks = await prisma.community.findMany({
            select:{
                projects: {
                    select:{
                        tasks: {
                            select:{
                                id: true,
                                title: true,
                                priority: true,
                                createdAt: true,
                                completedDate: true,
                                deadline: true,
                            }
                        }
                    }
                }
            },
            where: {
                id: Number(communityId)
            }
        });

        if(!tasks){
            return responseCodes.clientError.notFound(res, "tasks not found");
        }
        return responseCodes.success.ok(res, tasks);
    }
    catch(e){
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}