import { Request, response, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { isUserMember } from "../../utils/isUserMember";
import { prisma } from "../../config/dbConnect";

export const get_calendar_task = async(req:Request, res: Response) => {
    try{
        const {userId} = req.body;
        const communityId = Number(req.params.id);
        if(!communityId){
            return responseCodes.clientError.notFound(res, "communityId not found");
        }

        const member = await isUserMember(userId, communityId);
        if(!member){
            return responseCodes.clientError.badRequest(res, "You are not a member of the community");
        }

        const tasks = await prisma.communityCalendar.findMany({
            where:{
                communityId: communityId
            },
            select:{
                id: true,
                title: true,
                description: true,
                startTime: true,
                endTime: true,
                color: true
            }
        })
        return responseCodes.success.created(res, tasks, "get Tasks");
    }
    catch(error){
        console.log("get calendar task error", error);
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}