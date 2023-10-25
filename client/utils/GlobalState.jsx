import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const ChatContext = createContext();
const { Provider } = ChatContext;

const ChatProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    messages: [],
    friends: [],
    error: null,
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChatContext };