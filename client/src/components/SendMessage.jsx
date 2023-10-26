import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations"; 
import { QUERY_ME } from "../../utils/queries"

const SendMessage = ({ receiverId }) => {
  const [value, setValue] = useState("");
  
  const [addMessage] = useMutation(ADD_MESSAGE, {
    onError: (error) => {
      console.log("error", error);
    },
    onCompleted: () => {
      setValue("");
    },
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter a valid message!");
      return;
    }

    try {
      console.log("variables", value, receiverId);
      await addMessage({
        variables: {
          message: value,
          receiverId: receiverId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white absolute w-full bottom-0 py-10">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input w-full text-darkestpink focus:outline-none focus:ring-pink focus:ring-2 bg-lightestpink rounded"
          type="text"
        />
        <button type="submit" className="w-auto bg-lightestpink text-pink rounded-r-lg px-5 text-sm">
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;