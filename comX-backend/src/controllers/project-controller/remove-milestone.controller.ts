import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { prisma } from "../../config/dbConnect";

export const remove_milestone = async (req: Request, res: Response) => {
    try {
        const { projectId, milestone } = req.body;

        // Retrieve the current milestones for the project
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { milestones: true },
        });

        if (!project) {
            return responseCodes.clientError.notFound(res, "Project not found");
        }

        // Filter out the specified milestone from the existing milestones array
        const updatedMilestones = (project.milestones || []).filter(
            (m: string) => m !== milestone
        );

        // Update the project with the new milestones array
        await prisma.project.update({
            where: { id: projectId },
            data: { milestones: updatedMilestones },
        });

        return responseCodes.success.ok(res, updatedMilestones);
    } catch (e) {
        console.log(e);
        return responseCodes.serverError.internalServerError(res, "An error occurred while removing the milestone");
    }
};