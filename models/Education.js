// models/Education.js
import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
    {
        degree: {
            type: String,
            required: [true, 'Degree is required'],
            trim: true,
        },
        institution: {
            type: String,
            required: [true, 'Institution name is required'],
            trim: true,
        },
        years: {
            type: String,               // e.g. "2022 – 2026"
            required: [true, 'Years are required'],
        },
        description: {
            type: String,               // optional paragraph for extra details
            default: '',
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Education', educationSchema);
