import React, { useEffect, useState, useRef } from 'react'
import { IoSend } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import { SlOptionsVertical } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import Chat from './Chat';
import { appData } from "../data/data";
import EmojiPicker from "emoji-picker-react";

function Chats({ index, isDark }) {
    const [chats, setChats] = useState(index === null ? null : Object.values(appData[index]));
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const textBoxRef = useRef(null);

    useEffect(() => {
        if (index === null) return;
        setChats(Object.values(appData[index]))
    }, [index])

    // send messages features
    const sendMessage = (message) => {
        if (message !== "")
            setChats([[...chats[0], message]]);
    }

    const onClickHandler = () => {
        const message = textBoxRef.current.value.trim();
        sendMessage(message);
        textBoxRef.current.value = "";

        // close the emoji menu if open 
        setIsEmojiOpen(false);
    }

    const keyDownHandler = (event) => {
        // enter key feature
        if (event.key === "Enter") {
            const message = textBoxRef.current.value.trim();
            sendMessage(message);
            textBoxRef.current.value = ""
        };

        // close the emoji menu if open 
        setIsEmojiOpen(false);
    }

    // scroll the chats
    useEffect(() => {
        const chatArea = document.querySelector(".chat-area");
        chatArea.scrollTop = chatArea.scrollHeight;

    }, [chats]);

    // emoji menu feature
    const emojiClickHandler = (emoji) => {
        textBoxRef.current.value += emoji.emoji;
        textBoxRef.current.focus();
    }

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
                {chats && ichats.map((chat) => {
                        return chat.map((ch, i) => {
                            return <Chat key={i} message={ch} />
                        })
                    })}
            </div>
            {index !== null && <div className="relative input-box-container px-4 py-2 flex items-center bg-neutral-200 justify-center gap-6 w-full dark:bg-neutral-700">
                <div onClick={() => setIsEmojiOpen(!isEmojiOpen)} className="emoji-button text-2xl text-neutral-500 dark:text-neutral-200 cursor-pointer p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full">
                    <BsEmojiSmile />
                </div>
                <div className='absolute left-2 bottom-12'>
                    <EmojiPicker className='scale-90 shadow-md' open={isEmojiOpen} emojiStyle='google' skinTonesDisabled={true} width={300} height={400} onEmojiClick={emojiClickHandler} theme={isDark ? "dark" : "light"} />
                </div>
                <input type="text" ref={textBoxRef} onKeyDown={keyDownHandler} className='w-[90%] h-8 px-2 rounded-md outline-none dark:bg-neutral-500 dark:text-neutral-100' />
                <div className='p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full cursor-pointer text-neutral-500 dark:text-neutral-200'>
                    <FaMicrophone className='text-2xl' />
                </div>
                <div className="send-button bg-green-700 hover:bg-green-600 p-2 rounded-full cursor-pointer text-white dark:text-neutral-200" onClick={onClickHandler}>
                    <IoSend className='text-2xl ' />
                </div>
            </div>}
        </div>
    )
}

export default Chats