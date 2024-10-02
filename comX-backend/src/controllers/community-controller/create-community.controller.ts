import { Request, Response } from 'express';
import { prisma } from '../../config/dbConnect';
import { responseCodes } from '../../utils/response-codes'; // Importing response codes
import { v4 as uuidv4 } from 'uuid'; // To generate unique codes

// Function to generate a unique join code
const generateUniqueJoinCode = async (): Promise<string> => {
  let joinCode: string;
  let isUnique = false;

  // Keep generating a new join code until a unique one is found
  do {
    joinCode = uuidv4().slice(0, 8); // Generate a random 8-character string
    const existingCommunity = await prisma.community.findUnique({
      where: { joinCode },
    });
    if (!existingCommunity) {
      isUnique = true; // It's unique
    }
  } while (!isUnique);

  return joinCode;
};

// Create a new community
export const create_community = async (req: Request, res: Response) => {
  try {
    const { name, description, scope, userId } = req.body;

    // Check if the user is authenticated
    if (!userId) {
      return responseCodes.clientError.unauthorized(res, 'Unauthorized');
    }

    // Generate a unique join code
    const joinCode = await generateUniqueJoinCode();

    // Create the community
    const newCommunity = await prisma.community.create({
      data: {
        name,
        description,
        scope: scope || 'PUBLIC', // Default to PUBLIC if not provided
        joinCode,
        members: {
          create: {
            userId,
            role: 'OWNER', // Automatically make the creator the owner
          },
        },
      },
      include: {
        members: true, // Include members in the response
      },
    });

    return responseCodes.success.created(res, newCommunity, 'Community created successfully');
  } catch (error) {
    console.error('Error creating community:', error);
    return responseCodes.serverError.internalServerError(res, 'Internal server error');
  }
};
