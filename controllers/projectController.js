import Project from '../models/Project.js';
import { validationResult } from 'express-validator';

export const getAll = async (req, res, next) => {
    try {
        const data = await Project.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const newItem = new Project(req.body);
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ msg: 'Project not found' });
        res.json({ msg: 'Deleted' });
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                link: req.body.link,
                image: req.body.image,
            },
            { new: true }
        );

        if (!updated) return res.status(404).json({ msg: 'Project not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};
