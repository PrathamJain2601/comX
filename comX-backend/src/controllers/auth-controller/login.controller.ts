import { Request, Response } from "express";
import { create_token } from "../../utils/token";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";
import { loginRequest, loginRequestSchema } from "@prathamjain522/comx-common";

export const login = async (req: Request, res: Response) => {
    const parseResult = loginRequestSchema.safeParse(req.body);
    if(!parseResult.success){
        return responseCodes.clientError.badRequest(res, parseResult.error.errors, "message");
    }
    const { emailOrUsername, password }:loginRequest = req.body;
    if (!password || !emailOrUsername) {
        return responseCodes.clientError.notFound(res, "All fields are required");
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername},
                    { username: emailOrUsername }
                ]
            },
        });
        if(!user){
            return responseCodes.clientError.notFound(res, "User not found");
        }

        if(password != user.password){
            return responseCodes.clientError.forbidden(res, "wrong email or password");
        }

        await create_token(res, user);
        user.password = "";
        return responseCodes.success.ok(res, user, "Logged in successfully");
    }
    catch(error){
        console.log(error);
        return responseCodes.serverError.internalServerError(res, "Internal Error");
    }
};