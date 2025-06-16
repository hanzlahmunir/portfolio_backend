// routes/educationRoutes.js
import express from 'express';
import { body } from 'express-validator';
import {
    getAll,
    getOne,
    create,
    update,
    remove,
} from '../controllers/educationController.js';

const router = express.Router();

/* Validators used for POST & PUT */
const educationValidators = [
    body('degree').notEmpty().withMessage('Degree is required'),
    body('institution').notEmpty().withMessage('Institution is required'),
    body('years').notEmpty().withMessage('Years are required'),
];

// Public reads
router.get('/', getAll);
router.get('/:id', getOne);

// Admin writes (attach auth middleware if you add JWT later)
router.post('/', educationValidators, create);
router.put('/:id', educationValidators, update);
router.delete('/:id', remove);

export default router;
