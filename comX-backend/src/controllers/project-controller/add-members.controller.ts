import { Request, Response } from "express"
import { responseCodes } from "../../utils/response-codes"
export const add_members = (req: Request, res: Response) =>{
    responseCodes.serverError.serviceUnavailable(res, "service unavailable");
}