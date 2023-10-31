import { useState, useEffect, useRef, useContext } from 'react';
import ChatBox from '../components/Chatbox';
import FriendsList from '../components/FriendsList'

export default function Chat() {
    const [receiverId, setReceiverId] = useState(null);

    return (
        <div className="flex w-screen lg:h-screen md:h-screen sm:j-screen divide-solid min-h-screen">
            <div className="flex w-5/6 lg:h-5/6 lg:mx-auto lg:my-auto">
                <div className="lg:block pl-4 pr-4 w-64 bg-white text-pink">
                    <FriendsList onFriendClick={(id) => setReceiverId(id)} />
                </div>
                <div className="flex flex-col flex-grow lg:max-w-full bg-white relative text-pink">
                    <ChatBox receiverId={receiverId}/>
                </div>
            </div>
        </div>
    )
}