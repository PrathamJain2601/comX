import { Request, response, Response } from "express";
import { prisma } from "../../config/dbConnect";
import { responseCodes } from "../../utils/response-codes";

export const get_project_details = async(req: Request, res: Response) => {
    try{
        const projectId:number = Number(req.params.projectId);
        if(!projectId){
            return responseCodes.clientError.badRequest(res, "projectId not found for finding details");
        }
        const details = await prisma.project.findUnique({
            where:{
                id: projectId
            }
        })
        if(!details) {
            return responseCodes.clientError.notFound(res, "no such project found");
        }
        return responseCodes.success.ok(res, details, "project details fetched");
    }
    catch(e){
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}