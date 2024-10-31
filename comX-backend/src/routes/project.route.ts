import { Router } from "express";
import { add_members } from "../controllers/project-controller/add-members.controller";
import { create_project } from "../controllers/project-controller/create-project.controller";
import { delete_project } from "../controllers/project-controller/delete-project.controller";
import { isUserAdmin } from "../middlewares/isUserAdmin.middleware";
import { isUserInProject } from "../middlewares/isUserInProject.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post('/create-project', isAuthenticated, isUserAdmin, create_project);
router.post('/add-member',isAuthenticated, isUserAdmin, isUserInProject, add_members);
router.delete('/delete-project',isAuthenticated, isUserAdmin, isUserInProject, delete_project);

module.exports = router;