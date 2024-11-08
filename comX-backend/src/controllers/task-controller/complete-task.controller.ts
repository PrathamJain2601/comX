import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const complete_task = async (req: Request, res: Response) => {
    try {
        const {taskId} = req.body;
        await prisma.task.update({
            data:{
                status: 'PENDING'
            },
            where:{
                id: taskId
            }
        })
        return responseCodes.success.ok(res, "Task completed.");
    } catch (error) {
        console.error(error);
        return responseCodes.serverError.internalServerError(res, "Internal server error");
    }
};
