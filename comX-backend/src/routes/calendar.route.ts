import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { set_calendar_task } from "../controllers/calendar-controller/set-calendar-task.controller";
import { get_calendar_task } from "../controllers/calendar-controller/get-calendar-task.controller";
const router = Router();

router.post("/set-calendar-task", isAuthenticated, set_calendar_task);
router.get("/get-calendar-task/:id", isAuthenticated, get_calendar_task);

module.exports = router;