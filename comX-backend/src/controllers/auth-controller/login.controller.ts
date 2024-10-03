import { Request, Response } from "express";
import { create_token } from "../../utils/token";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const login = async (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.body;
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
        await create_token(res, user);
        user.password = "";
        return responseCodes.success.ok(res, user, "Logged in successfully");
    }
    catch(error){
        console.log(error);
        return responseCodes.serverError.internalServerError(res, "Internal Error");
    }
};