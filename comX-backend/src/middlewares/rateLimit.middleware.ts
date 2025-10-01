import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    status: 429,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true, 
  legacyHeaders: false,  
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5,
  message: {
    status: 429,
    message: 'Too many login attempts. Try again in 10 minutes.',
  },
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: {
    status: 429,
    message: 'Too many OTP requests. Try again later.',
  },
});

export const otpVerifyLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    message: "Too many OTP verification attempts. Try again later.",
  },
});