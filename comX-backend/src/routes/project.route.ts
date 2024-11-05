import { Router } from "express";
import { add_members } from "../controllers/project-controller/add-members.controller";
import { create_project } from "../controllers/project-controller/create-project.controller";
import { delete_project } from "../controllers/project-controller/delete-project.controller";
import { isUserAdmin } from "../middlewares/isUserAdmin.middleware";
import { isUserInProject } from "../middlewares/isUserInProject.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { get_project_details } from "../controllers/project-controller/get-project-details.controller";
import { isUserMember } from "../middlewares/isUserMember.middleware";
import { get_all_projects } from "../controllers/project-controller/get-all-projects.controller";

const router = Router();

router.get('/get-all-projects/:communityId', isAuthenticated, isUserMember, get_all_projects);
router.post('/create-project', isAuthenticated, isUserAdmin, create_project);
router.post('/add-member',isAuthenticated, isUserAdmin, isUserInProject, add_members);
router.delete('/delete-project',isAuthenticated, isUserAdmin, isUserInProject, delete_project);
router.get('/get-project-details/:communityId/:projectId', isAuthenticated, isUserInProject, get_project_details)
module.exports = router;