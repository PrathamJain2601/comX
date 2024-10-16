import { Request, Response } from "express"
import { prisma } from "../../config/dbConnect";
import { responseCodes } from "../../utils/response-codes";
export const get_user_communities = async(req: Request, res: Response) => {
    const { userId } = req.body;
    
    try {
        const userCommunities = await prisma.communityMember.findMany({
          where: {
            userId: userId,
          },
          include: {
            community: true,
          },
        });
    
        const communities = userCommunities.map((membership) => membership.community);
    
        return communities;
      } catch (error) {
        console.log('Error fetching user communities:', error);
        return responseCodes.serverError.internalServerError(res, "internal server error");
      }
}