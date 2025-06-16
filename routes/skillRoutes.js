import express from 'express';
import { body } from 'express-validator';
import { getAll, create, remove, update } from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', [body('name').notEmpty()], create);
router.delete('/:id', remove);
router.put('/:id', [body('name').notEmpty()], update);

export default router;
