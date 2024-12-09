import { User, Game } from "../models/index.js";
const userController = {
    updateUser: async (id, updates) => {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user)
            throw new Error("User not found");
        return user;
    },
    deleteUser: async (id) => {
        const user = await User.findById(id);
        if (!user)
            throw new Error("User not found");
        // Cascade delete games associated with the user
        await Game.deleteMany({ userId: id });
        await user.deleteOne();
        return true;
    },
};
export default userController;
