const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { userId }, context) => {
            return User.findOne({_id: context.user ? context.user._id: userId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });

            }
            throw AuthenticationError;
            //     $or: [
            //         { _id: user ? user._id : params.id },
            //         { username: params.username },
            //     ],
            // });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {

            // (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // $or: [{ username, email }],

            if (!user) throw AuthenticationError;

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) throw AuthenticationError;

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            // if (context.user) {
                // const savedBook = await Book.create({
                //     book
                // })
            
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { runValidators: true, new: true }
                );
            }
            throw AuthenticationError;
        },
        // removeUser: async (parent, { userId }, context) => {
        //     return User.findOneAndDelete({ _id: userId });
        // },
        removeBook: async (parent, { userId, bookId }, context) => {
            if (context.user || userId) {
                return User.findOneAndUpdate(
                    { _id: context.user ? context.user._id : userId },
                    { $pull: { savedBooks: { bookId } }},
                    { new: true }
                );
            }
            // throw AuthenticationError;
        },
    },
};

module.exports = resolvers;