import mongoose, { Schema, type Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  games: mongoose.Types.ObjectId[];
  isCorrectPassword: (password: string) => Promise<boolean>;
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema(
  {
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
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to check if the entered password is correct
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export { type IUser, User };