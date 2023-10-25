import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($receiverId: ID!, $message: String!) {
    addMessage(receiverId: $receiverId, message: $message) {
      _id
      senderId {
        _id
        username
      }
      message
      receiverId {
        _id
        username
      }     
    }
  }
`;

export const ADD_FRIEND = gql`
    mutation addFriend($userId: ID!) {
        addFriend(userId: $userId) {
            _id
            username
            email
            friends {
                _id
                username
                email
                profilePic
            }
        }
    }
`;
export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!, $friendId: ID!) {
    removeFriend(userId: $userId, friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;