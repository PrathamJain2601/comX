import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const complete_task = async (req: Request, res: Response) => {
    try {
        const {taskId, userId} = req.body;
        
        const data = await prisma.task.update({
            data:{
                status: 'PENDING',
                completedDate: new Date()
            },
            where:{
                id: taskId,
                assignId: userId
            }
        })
        if(data){
            return responseCodes.success.ok(res, "Task completed.");
        }
        return responseCodes.clientError.badRequest(res, "You are not assigned this task");
    } catch (error) {
        console.error(error);
        return responseCodes.serverError.internalServerError(res, "Internal server error");
    }
};
