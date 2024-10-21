import { Request, Response } from "express"
import { responseCodes } from "../../utils/response-codes"
export const delete_project = (req: Request, res: Response) =>{
    responseCodes.serverError.serviceUnavailable(res, "service unavailable");
}