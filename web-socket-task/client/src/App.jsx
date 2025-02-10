
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { RiSendPlane2Fill } from "react-icons/ri";

const socket = io('http://localhost:8080');

const App = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('history', (history) => {
      setChat(history);
    });

    socket.on('response', (aiMessage) => {
      setChat((prevChat) => [...prevChat, { role: 'groq', content: aiMessage }]);
      console.log(aiMessage)
    });

    socket.on('error', (errorMessage) => {
      alert(errorMessage);
    });

    return () => {
      socket.off('history');
      socket.off('response');
      socket.off('error');
    };
  }, []);

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log(message)
      socket.emit('message', message);
      setChat((prevChat) => [...prevChat, { role: 'user', content: message }]);
      setMessage('');
    }
  };
  return (
    <div className="h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 h-[80%] flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-4 font-mono">💬 Chat with Groq AI</h1>
        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg max-w-sm ${msg.role === 'user' ? 'bg-purple-200 self-end ml-auto' : 'bg-amber-200'
                }`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Groq'}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 bg-gray-100 rounded-full p-2 outline-none"
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="border-2 text-3xl text-teal-500 border-teal-500 px-4 py-1 rounded-full hover:bg-teal-500 hover:text-white cursor-pointer"
          >
            <RiSendPlane2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;