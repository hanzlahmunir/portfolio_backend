import express from 'express';
import { login, createAdmin } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], login);

// Optional: route to create admin manually
router.post('/create-admin', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], createAdmin);

export default router;
