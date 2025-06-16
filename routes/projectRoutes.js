import express from 'express';
import { body } from 'express-validator';
import { getAll, create, remove, update } from '../controllers/projectController.js';

const router = express.Router();

const validators = [
    body('title').notEmpty(),
    body('description').notEmpty(),
];

router.get('/', getAll);
router.post('/', validators, create);
router.delete('/:id', remove);
router.put('/:id', update);

export default router;
