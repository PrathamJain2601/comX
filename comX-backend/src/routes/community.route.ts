import { Router } from "express";
import { create_community } from "../controllers/community-controller/create-community.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { get_all_communities } from "../controllers/community-controller/get-all-community.controller";
import { delete_community } from "../controllers/community-controller/delete-community.controller";
import { update_community } from "../controllers/community-controller/update-community.controller";
import { get_community_details } from "../controllers/community-controller/get-community-details.controller";
import { get_user_communities } from "../controllers/community-controller/get-user-communities.controller";

const router = Router();

router.post("/create-community",isAuthenticated, create_community);
router.get("/get-all-communities",isAuthenticated, get_all_communities);
router.delete("/delete-community",isAuthenticated, delete_community);
router.put("/update-community",isAuthenticated, update_community);
router.post("/get-community-details", isAuthenticated, get_community_details);
router.get("/get-user-communities", isAuthenticated, get_user_communities);

module.exports = router;