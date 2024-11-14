import { Router } from "express";
import { get_user_info } from "../controllers/user-controller/get-user-info.controller";

const router = Router();

router.get("/get-user-info/:username", get_user_info);

module.exports = router;