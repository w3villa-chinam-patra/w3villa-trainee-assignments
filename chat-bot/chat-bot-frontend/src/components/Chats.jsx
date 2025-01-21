import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import Chat from './Chat';
import background from "../assets/images/background.png"
function Chats() {
    const [chats, setChats] = useState(["hello", "how are you", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello"]);
    const sendMessage = (event) => {
        const message = event.currentTarget.parentNode.firstChild.value;
        setChats([...chats, message]);
        event.currentTarget.parentNode.firstChild.value = "";


    }
    useEffect(() => {
        // scroll the chats
        const chatArea = document.querySelector(".chat-area");
        chatArea.scrollTop = chatArea.scrollHeight;
    }, [chats]);

    return (
        <div className='bg-slate-100 h-screen flex flex-col'>
            <div className='flex gap-4 px-4 py-2 items-center contact-info bg-slate-300'>
                <IoMdContact className='text-5xl text-slate-600' />
                <div className="contact-name text-xl">Contact Name</div>
            </div>
            <div className=' relative chat-area flex flex-col gap-2 py-2 px-8 flex-1 overflow-y-scroll bg-chat-background'>
                {chats.map((chat, index) => <Chat key={index} message={chat} />)}
            </div>
            <div className="input-box p-2 flex items-center bg-slate-300 justify-center gap-4 w-full">
                <input type="text" className='bg-slate-400 w-[90%] h-8 px-2 rounded-md outline-none' />
                <div className="send-button bg-green-700 p-2 rounded-full" onClick={sendMessage}>
                    <IoSend className='text-2xl text-white cursor-pointer' />
                </div>
            </div>
        </div>
    )
}


export default Chats