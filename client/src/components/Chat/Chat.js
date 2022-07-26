import React, { useEffect, useState } from 'react'
import socketIo from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";

import { user } from "../Join/Join";
import Message from "../Message/Message";
import TextContainer from '../TextContainer/TextContainer';
import sendLogo from "../../images/send.png";
import "./Chat.css";

let socket;

const ENDPOINT = "https://rapid-chat.herokuapp.com/";

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('');

    const send = () => {
        const message = document.getElementById('chatInput').value;
        if (message) {
            socket.emit('message', { message, id });
            document.getElementById('chatInput').value = "";
        }
    }

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setid(socket.id);
        })

        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('addOnline', (data) => {
            // console.log(data);
            setUsers(data);
            // console.log(users);
            // list_users[data.id] = data.name;
            // console.log(list_users);
        })

        socket.on('removeOnline', (data) => {
            // console.log(data);
            setUsers(data);
            // console.log(users);
            // delete list_users[data.id];
            // console.log(list_users);
        })

        return () => {
            socket.off();
        }

    }, [messages])

    return (
        <div className="chatPage">

            <div className="chatContainer">

                <div className="header">
                    <h2>Quick Chat</h2>
                    <a href="/"> close </a>
                </div>

                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>

                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"> <img src={sendLogo} alt="Send" /> </button>
                </div>

            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat
