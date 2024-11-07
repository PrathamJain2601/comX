import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isUserInProject } from "../middlewares/isUserInProject.middleware";
import { add_task } from "../controllers/task-controller/add-task.controller";
import { delete_task } from "../controllers/task-controller/delete-task.controller";
import { edit_task } from "../controllers/task-controller/edit-task.controller";

const router = Router();

router.post('/add-task', isAuthenticated, isUserInProject, add_task);
router.delete('/delete-task', isAuthenticated, isUserInProject, delete_task);
router.put('/edit-task', isAuthenticated, isUserInProject, edit_task);
router.get('/get-all-tasks-in-project/:communityId/:projectId', isAuthenticated, isUserInProject, )


module.exports = router;