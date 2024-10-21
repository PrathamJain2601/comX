import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const verify_email_otp = async(req: Request, res: Response) => {
    const {email, otp} = req.body;
    if(!email || !otp){
      return responseCodes.clientError.badRequest(res, "need otp and email");
    }
    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    });
    if(!user){
        return responseCodes.clientError.notFound(res, "user not found with this email");
    }
    const currentTime = new Date();
    if (user.otp !== otp || user.isOtpValid === null || currentTime > user.isOtpValid) {
        
        return responseCodes.clientError.badRequest(res, "Invalid or expired OTP");
    }

    await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          isVerified: true,
          otp: null,             
          isOtpValid: null,       
        },
      });
  
      return responseCodes.success.ok(res, "Email verified successfully");
}