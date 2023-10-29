import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations"; 
import { QUERY_ME } from "../../utils/queries"

const SendMessage = ({ receiverId }) => {
  const [value, setValue] = useState("");
  
  const [addMessage] = useMutation(ADD_MESSAGE, {
    onError: (error) => {
      console.log("error", error);
    }
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter a valid message!");
      return;
    }

    setValue("")

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
          className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-pink bg-lightestpink bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-darkestpink outline-pink focus:ring-pink transition duration-200 ease-in-out focus:z-[3] focus:border-pink focus:text-darkestpink focus:shadow-pink focus:outline-pink dark:border-darkestpink dark:text-darkestpink dark:placeholder:text-darkestpink dark:focus:border-pink"
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