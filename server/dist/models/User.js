import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
// Define the User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Game',
        },
    ],
}, { timestamps: true, toJSON: { virtuals: true } });
// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// Method to check if the entered password is correct
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
// Create and export the User model
const User = mongoose.model('User', userSchema);
export { User };
