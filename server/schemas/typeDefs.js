const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    profilePic: String
    friends: [User]!
  }

  type Message {
    _id: ID
    senderId: User!
    message: String
    receiverId: User!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    friends(username: String): [User]
    messages(receiverId: ID!): [Message]
    latestMessage(receiverId: ID!): Message 
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(userId: ID!): User
    removeFriend(username:String): User
    addMessage(receiverId: ID!, message: String!): Message
  }

  type Subscription {
    messageAdded(receiverId: ID!): Message
}
`;

module.exports = typeDefs;
