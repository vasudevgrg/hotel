import React, { useState, useEffect } from 'react';
const { io } = require("socket.io-client");

const Chat = ({ user_id, receiver_id }) => {
    const [prevMessages, setPrevMessages] = useState([]);
    const [message, setMessage] = useState("");
    const socket = io("http://localhost:5002");
console.log("inside chat");
    useEffect(() => {
        socket.on("connect", () => {
            console.log(`Connected: ${socket.id}`);
        });

        socket.on("receive_message", (message) => {
            setPrevMessages((prev) => [...prev, message]);
        });

        socket.on("disconnect", () => {
            console.log(`Disconnected: ${socket.id}`);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const sendMessage = () => {
        socket.emit("send_message", {
            content: message,
            sender_id: user_id,
            receiver_id
        });
        setPrevMessages((prev) => [...prev, { content: message, sender_id: user_id, receiver_id }]);
        setMessage("");
    };

    return (
        <div className='chatbox'>
            <h2 style={{position:"fixed", top:0}}>Chat with {receiver_id}</h2>
            <div>
                <ol>
                    {prevMessages.map((e, index) => (
                        <li key={index}>{e.content}</li>
                    ))}
                </ol>
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
