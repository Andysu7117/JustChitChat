import { gql } from '@apollo/client';

// User queries
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      profilePic
      friends {
        _id
        username
        email
        profilePic
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
      email
      friends {
        _id
        username
        email
      }
    }
  }
`;

export const QUERY_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profilePic
    }
  }
`;

// Message queries
export const QUERY_MESSAGES = gql`
  query GetMessages($receiverId: ID!) {
    messages(receiverId: $receiverId) {
      _id
      senderId {
        _id
        username
        profilePic
      }
      message
      receiverId {
        _id
        username
        profilePic
      }
      createdAt
    }
  }
`;

export const QUERY_LATESTMESSAGE = gql`
  query LatestMessage($receiverId: ID!) {
    latestMessage(receiverId: $receiverId) {
      _id
      senderId {
        _id
        username
        profilePic
      }
      message
      receiverId {
        _id
        username
        profilePic
      }
      createdAt
    }
  }
`;

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($receiverId: ID!) {
    messageAdded(receiverId: $receiverId) {
      _id
      message
      senderId {
        _id
        username
        profilePic
      }
      receiverId {
        _id
        username
        profilePic
      }
      createdAt
    }
  }
`;