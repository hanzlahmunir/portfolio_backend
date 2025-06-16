import Skill from '../models/Skill.js';
import { validationResult } from 'express-validator';

export const getAll = async (req, res, next) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });
        res.json(skills);
    } catch (err) {
        next(err);
    }
};

export const create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const newSkill = new Skill(req.body);
        const saved = await newSkill.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        const deleted = await Skill.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ msg: 'Skill not found' });
        res.json({ msg: 'Deleted' });
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        const updated = await Skill.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        if (!updated) return res.status(404).json({ msg: 'Skill not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};