import { useQuery, useSubscription } from "@apollo/client";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { QUERY_MESSAGES, MESSAGE_ADDED } from "../../utils/queries";
import SendMessage from "./SendMessage";

const ChatBox = ({ receiverId }) => { 
  const messagesEndRef = useRef();
  const { data, loading, error } = useQuery(QUERY_MESSAGES, {
    pollInterval: 5000,
    variables: {
      receiverId,
      limit: 50,
    },
  });
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data: subscriptionData } = useSubscription(MESSAGE_ADDED, {
    variables: { receiverId },
  });

  useEffect(() => {
    if (data && data.messages) {
        setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData && subscriptionData.messages) {
      setMessages((prevMessages) => [
        ...prevMessages,
        subscriptionData.messageAdded,
      ]);
      scrollToBottom();
    }
  }, [subscriptionData]);

  
  
  if (!receiverId) {
    return <p>Please select a friend to chat with.</p>;
  }

  if (loading) return <p className="text-center text-pink">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  console.log("id's", receiverId)
  console.log("data", data)
  console.log("messages", messages)  

  return (
    <div className="p-4 h-screen overflow-y-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
      <SendMessage receiverId={receiverId}/>
    </div>
  );
};

export default ChatBox;