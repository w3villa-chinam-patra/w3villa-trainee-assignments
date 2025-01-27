import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import { SlOptionsVertical } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import Chat from './Chat';
import { appData } from "../data/data"
function Chats({ index }) {
    const [chats, setChats] = useState(index === null ? null : Object.values(appData[index]));

    useEffect(() => {
        if (index === null) return;
        setChats(Object.values(appData[index]))
    }, [index])


    const sendMessage = (event) => {
        const message = event.currentTarget.parentNode.childNodes[1].value.trim();
        if (message !== "")
            setChats([[...chats[0], message]]);
        event.currentTarget.parentNode.childNodes[1].value = "";


    }
    useEffect(() => {
        // scroll the chats
        const chatArea = document.querySelector(".chat-area");
        chatArea.scrollTop = chatArea.scrollHeight;

    }, [chats]);

    return (
        <div className='bg-neutral-100 h-screen flex flex-col'>
            {index !== null && <header className='flex items-center gap-4 px-4 min-h-16 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100'>
                <div className='user-info flex gap-2'>
                    <IoMdContact className='text-6xl text-white dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-600 rounded-full' />
                    <div className="wrapper my-2">
                        <div className="contact-name">{Object.keys(appData[index])[0]}</div>
                        <div className="status text-sm text-neutral-500 dark:text-neutral-400">online</div>
                    </div>
                </div>
                <div className="features text-neutral-500 dark:text-neutral-200 flex gap-2 ml-auto">
                    <div className='p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full cursor-pointer'>
                        <ImAttachment />
                    </div>
                    <div className='p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full cursor-pointer'>
                        <SlOptionsVertical />
                    </div>
                </div>
            </header>}
            <div className='relative chat-area flex flex-col gap-2 py-2 px-8 flex-1 overflow-y-auto bg-chat-background dark:invert'>
                {chats && chats.map((chat) => {
                    return chat.map((ch, i) => {
                        return <Chat key={i} message={ch} />
                    })
                })}
            </div>
            {index !== null && <div className="input-box px-4 py-2 flex items-center bg-neutral-200 justify-center gap-6 w-full dark:bg-neutral-700">
                <div className="emoji-button text-2xl text-neutral-500 dark:text-neutral-200 cursor-pointer p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full">
                    <BsEmojiSmile />
                </div>
                <input type="text" className='w-[90%] h-8 px-2 rounded-md outline-none dark:bg-neutral-500 dark:text-neutral-100' />
                <div className='p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full cursor-pointer text-neutral-500 dark:text-neutral-200'>
                    <FaMicrophone className='text-2xl' />
                </div>
                <div className="send-button bg-green-700 hover:bg-green-600 p-2 rounded-full cursor-pointer text-white dark:text-neutral-200" onClick={sendMessage}>
                    <IoSend className='text-2xl ' />
                </div>
            </div>}
        </div>
    )
}


export default Chats