import { Game, User } from '../models/index.js';
import { gameController, userController } from '../controllers/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
const resolvers = {
    Query: {
        getUser: async (_, { id }) => {
            return await User.findById(id);
        },
        getAllUsers: async () => {
            return await User.find();
        },
        getGame: async (_, { id }) => {
            return await Game.findById(id);
        },
        getAllGames: async (_, { userId }) => {
            return await Game.find({ userId });
        },
        me: async (_parent, _args, context) => {
            // If the user is authenticated, find and return the user's information along with their thoughts
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('games');
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('Could not authenticate user.');
        },
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            // Create a new user with the provided username, email, and password
            const user = await User.create({ ...input });
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);
            // Return the token and the user
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });
            // If no user is found, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);
            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);
            // Return the token and the user
            return { token, user };
        },
        updateUser: async (_, { id, username, email }) => {
            return await userController.updateUser(id, { username, email });
        },
        deleteUser: async (_, { id }) => {
            return await userController.deleteUser(id);
        },
        startGame: async (_, { userId }) => {
            return await gameController.startGame(userId);
        },
        guessWord: async (_, { gameId, letter }) => {
            return await gameController.guessWord(gameId, letter);
        },
        endGame: async (_, { gameId }) => {
            return await gameController.endGame(gameId);
        },
    },
};
export default resolvers;
