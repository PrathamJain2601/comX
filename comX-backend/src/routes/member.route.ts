import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { get_community_members } from "../controllers/member-controller/get-community-members.controller";
import { join_community } from "../controllers/member-controller/join-community.controller";
import { remove_member } from "../controllers/member-controller/remove-member.controller";
import { promote_member } from "../controllers/member-controller/promote-member.controller";
import { demote_member } from "../controllers/member-controller/demote-member.controller";
import { ban_member } from "../controllers/member-controller/ban-member.controller";
import { accept_join_request } from "../controllers/member-controller/accept-join-request.controller";

const router = Router();

router.post("/get-community-members", isAuthenticated, get_community_members);
router.post("/join-community", isAuthenticated, join_community);
router.post("/remove-member", isAuthenticated, remove_member);
router.post("/promote-member", isAuthenticated, promote_member);
router.post("/demote-member", isAuthenticated, demote_member);
router.post("/ban-member", isAuthenticated, ban_member);
router.post("/accept-join-request", isAuthenticated, accept_join_request);

module.exports = router;