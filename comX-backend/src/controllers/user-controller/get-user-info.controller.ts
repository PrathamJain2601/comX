import { Request, Response } from "express";
import { prisma } from "../../config/dbConnect";
import { responseCodes } from "../../utils/response-codes";

export const get_user_info = async(req: Request, res: Response) => {
    try{
        const user = await prisma.user.findFirst({
            select:{
                name: true,
                email: true,
                username: true,
                avatar: true,
                designation: true,
                registeredAt: true,
                Task: true
            },
            where:{
                username: req.params.username
            }

        })  
        if(!user){
            return responseCodes.clientError.badRequest(res, "user not found");
        }
        return responseCodes.success.ok(res, "user info");
    }
    catch(e){
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "internal server error");
    }
}