import { Router } from "express";
import { login } from "../controllers/auth-controller/login.controller";
import { register } from "../controllers/auth-controller/register.controller";
import { logout } from "../controllers/auth-controller/logout.controller";
import { verify_email_otp } from "../controllers/auth-controller/verify-email-otp.controller";
import { send_forgot_password_otp } from "../controllers/auth-controller/send-forgot-password-otp.controller";
import { verify_forgot_password_otp, change_password } from "../controllers/auth-controller/verify-forgot-password-otp.controller";
import { send_email_otp } from "../controllers/auth-controller/send-email-otp.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { loginLimiter, otpLimiter, otpVerifyLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post("/register", upload.single("file"), register);
router.post("/login", loginLimiter, login);
router.get("/logout",isAuthenticated, logout);
router.post("/send-email-otp", otpLimiter, send_email_otp);
router.post("/verify-email-otp", otpVerifyLimiter, verify_email_otp);
router.post("/send-forgot-password-otp", otpLimiter, send_forgot_password_otp);
router.post("/verify-forgot-password-otp", otpVerifyLimiter, verify_forgot_password_otp);
router.post("/change-password", change_password);

module.exports = router;