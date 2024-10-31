import { NextFunction, Request, response, Response } from "express";
import { prisma } from "../config/dbConnect";
import { responseCodes } from "../utils/response-codes";

export const isUserInProject = async(req: Request, res:Response, next: NextFunction) => {
    try{

        const {projectId, userId, communityId} = req.body;
        if(!projectId || !userId || !communityId){
            return responseCodes.clientError.badRequest(res, "not found some field");
        }
        console.log("\n \n \n adddfadfsfsdfds \n \n \n", projectId, userId, communityId);
        const verdict = await prisma.projectMembers.findFirst({
            select:{
                id: true
            },
            where:{
                projectId: projectId,
                communityId: communityId,
                userId: userId
            }
        })
        if(verdict){
            next();
        }
        else{
            return responseCodes.clientError.forbidden(res, "Not a member of the project");
        }
    }
    catch(e){
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "server error");
    }
}