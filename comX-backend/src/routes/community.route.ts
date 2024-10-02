import { Router } from "express";
import { create_community } from "../controllers/community-controller/create-community.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create-community",isAuthenticated, create_community);

module.exports = router;