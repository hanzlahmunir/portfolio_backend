// controllers/educationController.js
import { validationResult } from 'express-validator';
import Education from '../models/Education.js';

// GET /api/education
export const getAll = async (req, res, next) => {
    try {
        const data = await Education.find().sort({ years: -1 });
        res.json(data);
    } catch (err) {
        next(err);
    }
};

// GET /api/education/:id
export const getOne = async (req, res, next) => {
    try {
        const item = await Education.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Education not found' });
        res.json(item);
    } catch (err) {
        next(err);
    }
};

// POST /api/education
export const create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const newItem = new Education(req.body);
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

// PUT /api/education/:id
export const update = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const updated = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ msg: 'Education not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/education/:id
export const remove = async (req, res, next) => {
    try {
        const deleted = await Education.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ msg: 'Education not found' });
        res.json({ msg: 'Education removed' });
    } catch (err) {
        next(err);
    }
};