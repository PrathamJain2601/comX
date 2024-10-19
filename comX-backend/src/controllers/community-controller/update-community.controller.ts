import { Request, Response } from 'express';
import { prisma } from '../../config/dbConnect';
import { responseCodes } from '../../utils/response-codes'; // Importing response codes
import fs from "fs";
import { uploadOnCloudinary } from '../../utils/cloudinary';

export const update_community = async (req: Request, res: Response) => {
  try {
    const { userId, name, description, scope } = req.body;

    const communityId = Number(req.body.communityId);
    if(!communityId){
      return responseCodes.clientError.notFound(res, "community id is required");
    }

    // Check if the user is authenticated
    console.log("userid ", userId);
    if (!userId) {
      return responseCodes.clientError.unauthorized(res, 'Unauthorized');
    }

    // Find the community with its members
    const community = await prisma.community.findUnique({
      where: { id: communityId },
      include: { members: true },
    });

    if (!community) {
      return responseCodes.clientError.notFound(res, 'Community not found');
    }

    // Check if the user is an admin or the owner
    const member = community.members.find(member => member.userId === userId);
    if (!member || (member.role !== 'ADMIN' && member.role !== 'OWNER')) {
      return responseCodes.clientError.forbidden(res, 'Only admins or the owner can update the community');
    }

    // Prepare the data to be updated
    const dataToUpdate: any = {};

    // Check if the new name is unique
    if (name) {
      const existingCommunity = await prisma.community.findUnique({
        where: { name },
      });
      if (existingCommunity && existingCommunity.id !== communityId) {
        return responseCodes.clientError.badRequest(res, 'Community name must be unique');
      }
      dataToUpdate.name = name;
    }

    if (description) dataToUpdate.description = description;
    if (scope) dataToUpdate.scope = scope;

    // If no fields are provided, return an error
    if (Object.keys(dataToUpdate).length === 0) {
      return responseCodes.clientError.badRequest(res, 'No valid fields provided for update');
    }

    let coverImageUrl = null;
        if(req.file){
            const localFilePath = req.file.path;
            const cloudinaryResult = await uploadOnCloudinary(localFilePath);

            if(!cloudinaryResult){
                return responseCodes.serverError.internalServerError(res, "cloudinary upload failed");
            }
            
            coverImageUrl = cloudinaryResult.url;
            fs.unlinkSync(localFilePath);
        }
      
    if(coverImageUrl){
      dataToUpdate.coverImage = coverImageUrl;
    }
    // Update the community
    const updatedCommunity = await prisma.community.update({
      where: { id: communityId },
      data: dataToUpdate,
    });

    return responseCodes.success.ok(res, updatedCommunity, 'Community updated successfully');
  } catch (error) {
    console.error('Error updating community:', error);
    return responseCodes.serverError.internalServerError(res, 'Internal server error');
  }
};
