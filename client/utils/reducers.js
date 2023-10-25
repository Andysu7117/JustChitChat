import {
    SET_USER,
    ADD_MESSAGE,
    ADD_FRIEND,
    REMOVE_FRIEND,
    SET_ERROR,
    SET_LOADING
  } from './actions';
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: action.user,
        };
      case ADD_MESSAGE:
        return {
          ...state,
          messages: [...state.messages, action.message]
        };
      case ADD_FRIEND:
        return {
          ...state,
          friends: [...state.friends, action.friend]
        };
      case REMOVE_FRIEND:
        return {
          ...state,
          error: action.error
        }
      case SET_LOADING:
        return {
          ...state,
          loading: action.loading
        }
      default:
        return state;
    }
  };