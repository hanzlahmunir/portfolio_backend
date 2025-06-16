import express from 'express';
import { body } from 'express-validator';
import { getAll, create, update, remove } from '../controllers/experienceController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', [
    body('role').notEmpty(),
    body('company').notEmpty(),
    body('duration').notEmpty()
], create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
