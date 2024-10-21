import { Router } from "express";
import { add_members } from "../controllers/project-controller/add-members.controller";
import { create_project } from "../controllers/project-controller/create-project.controller";
import { delete_project } from "../controllers/project-controller/delete-project.controller";

const router = Router();

router.post('/create-project', create_project);
router.post('/add-member', add_members);
router.delete('/delete-project', delete_project);

module.exports = router;