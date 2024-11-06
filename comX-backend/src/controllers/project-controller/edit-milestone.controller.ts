import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const edit_milestone = async (req: Request, res: Response) => {
    try {
        const { projectId, oldMilestone, newMilestone } = req.body;

        // Retrieve the current milestones for the project
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { milestones: true },
        });

        if (!project) {
            return responseCodes.clientError.notFound(res, "Project not found");
        }

        // Check if the old milestone exists in the array
        const milestoneIndex = (project.milestones || []).indexOf(oldMilestone);
        if (milestoneIndex === -1) {
            return responseCodes.clientError.badRequest(res, "Milestone not found");
        }

        // Create a copy of the milestones and update the specified milestone
        const updatedMilestones = [...project.milestones];
        updatedMilestones[milestoneIndex] = newMilestone;

        // Update the project with the new milestones array
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: { milestones: updatedMilestones },
        });

        return responseCodes.success.ok(res, updatedProject);
    } catch (e) {
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "An error occurred while editing the milestone");
    }
};
