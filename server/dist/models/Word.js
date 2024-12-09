import { Schema, model } from 'mongoose';
// Define the schema for the Word document
const wordSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
}, {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
});
const Word = model('Word', wordSchema);
export { Word };
