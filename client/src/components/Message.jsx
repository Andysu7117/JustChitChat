import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";



const Message = ({ message }) => {
  const { data, loading, error } = useQuery(QUERY_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("currentuser", data)
  console.log("senderId", message)
  console.log("message", message.message)
  return (
    <div className={`flex ${message.senderId._id === data.me._id ? "justify-end" : "justify-start"} mb-4`}>
      <div className="flex items-center">
        <img src={message.senderId.profilePic} alt="Avatar" className="w-10 h-10 rounded-full mr-4"/>
        <div className={`${message.senderId._id === data.me._id ? "bg-lightpink" : "bg-blue"} p-4 rounded-lg`}>
          <div className={`font-bold mb-1 ${message.senderId._id === data.me._id ? "text-darkestpink" : "text-darkblue"}`}>{message.senderId.username}</div>
          <p className={`${message.senderId._id === data.me._id ? "text-darkestpink" : "text-darkblue"}`}>{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;