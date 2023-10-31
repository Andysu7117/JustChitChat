const { User, Message} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('friends');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('friends');
      },
      friends: async (parent, { username }) => {
        const params = username ? { username } : {};
        return User.find(params);
      },
      messages: async (parent, { receiverId }, context) => {
        if (context.user) {
          return Message.find({
            $or: [ 
              { senderId: context.user._id, receiverId: receiverId},
              { senderId: receiverId, receiverId: context.user._id}
            ]
          }).populate('senderId').populate('receiverId').sort({ createdAt: 1 })
        }
        throw AuthenticationError
      },
      latestMessage: async(parent, { receiverId }, context) => {
        if (context.user) {
          return await Message.findOne({
            $or: [
              {senderId: context.user._id, receiverId: receiverId},
              { senderId: receiverId, receiverId: context.user._id}
            ]
          }).sort({ createdAt: -1}).limit(1)
        }
        throw AuthenticationError;
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('friends');
        }
        throw AuthenticationError;
      },
    },

    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
        throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
        throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
      },
      addFriend: async (parent, { userId }, context) => {
          if (!context.user) {
              throw new AuthenticationError("You need to be logged in!");
          }
          const friendToAdd = await User.findOne({ _id: userId });
          if (!friendToAdd) {
              throw new Error("User not found");
          }
  
          const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { friends: friendToAdd} },
              { new: true }
          ).populate('friends');
  
          return user;
      },
      removeFriend: async (parent, { username }, context) => {
          if (!context.user) {
              throw new AuthenticationError("You need to be logged in!");
          }
  
          const friendToRemove = await User.findOne({ username });
          if (!friendToRemove) {
              throw new Error("User not found");
          }
          
          const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { friends: friendToRemove._id } },
              { new: true }
          ).populate('friends');
  
          return user;
      },   
      addMessage: async (parent, { receiverId, message }, context) => {
          if (!context.user) {
              throw new AuthenticationError("You need to be logged in!");
          }
          const sender = await User.findOne({ _id: context.user._id });
          const receiver = await User.findOne({ _id: receiverId });
          
          const newMessage = new Message({
              senderId: sender,
              message: message,
              receiverId: receiver,
          });
          pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage });
          await newMessage.save();
          return newMessage;
      },
    },
    Subscription: {
      messageAdded: {
        subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
      },
  }
};

module.exports = resolvers;
