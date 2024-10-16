import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { create_token } from "../../utils/token";
import { responseCodes } from "../../utils/response-codes";
import { generateOTP, sendOtpEmail } from "./send-email-otp.controller";
import { prisma } from "../../config/dbConnect";
import { registerRequestSchema, registerRequest } from "@prathamjain522/comx-common";

export const register = async (req: Request, res: Response) => {
    const parseResult = registerRequestSchema.safeParse(req.body);
    if(!parseResult.success){
        return responseCodes.clientError.badRequest(res, parseResult.error.errors, "message");
    }
    const { name, username, email, password, designation}: registerRequest = req.body;

    // add a function to check strength of password
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                username: username,
                password: password,
                designation: designation
            }
        })
        await create_token(res, user);
        const otp = generateOTP();
        await sendOtpEmail(user.email, otp, 'Email Verification OTP', `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`);
        user.password = "";
        return responseCodes.success.created(res, user, "User created successfully");
    }
    catch (error: unknown) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const targetField = error.meta?.target as string[];

                if (targetField.includes('email')) {
                    return responseCodes.clientError.badRequest(res, "Email already exists");
                }

                if (targetField.includes('username')) {
                    return responseCodes.clientError.badRequest(res, "Username already exists");
                }
            }
        }
        // console.log(error);
        return responseCodes.serverError.internalServerError(res, "Internal server error");
    }
}
