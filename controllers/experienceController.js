import Experience from '../models/Experience.js';
import { validationResult } from 'express-validator';

export const getAll = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const experience = new Experience(req.body);
        const saved = await experience.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

export const update = async (req, res) => {
    try {
        const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

export const remove = async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
