// File path: backend/src/routes/authRoutes.js
import express from 'express';
import authController from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Get current user
router.get('/me', auth, authController.getCurrentUser);

// Logout user
router.post('/logout', auth, authController.logout);

// Change password
router.post('/change-password', auth, authController.changePassword);

// Reset password request
router.post('/reset-password-request', authController.resetPasswordRequest);

// Reset password
router.post('/reset-password/:token', authController.resetPassword);

// Verify email
router.get('/verify/:token', authController.verifyEmail);

export default router;
