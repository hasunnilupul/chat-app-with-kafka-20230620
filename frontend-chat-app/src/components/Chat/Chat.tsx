import React from "react";
import "./Chat.css";

import User from "../../modal/User";
import Message from "../../modal/Message";

type ChatProps = {
    currentUser: User,
    messages: Array<any>,
    onSend: (value: string) => void
}

const Chat = ({currentUser, messages, onSend}: ChatProps) => {
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSend(e.target.value)
            e.target.value = "";
        }
    };

    const renderMessage = (index: number, message: Message) => {
        const sentByMe: boolean = currentUser.username === message.sender;
        const messageTime: Date = new Date(message.timestamp);
        const messageTimeFormated: string = `${messageTime.getFullYear()}/${messageTime.getMonth()}/${messageTime.getDate()} ${messageTime.getHours()}:${messageTime.getMinutes()}`

        return (
            <li className={`message-item ${sentByMe && 'sent'}`} key={index}>
                {
                    !sentByMe &&
                    (<div className="sender" title={message.sender}>
                        {message.sender.charAt(0).toUpperCase()}
                    </div>)
                }
                <p className="message" title={messageTimeFormated}>{message.content}</p>
            </li>
        );
    };

    return (
        <div className="chat">
            <ul className="messages-container">
                {
                    messages.map((message, index) => renderMessage(index, message))
                }
            </ul>
            <div className="input-container">
                <input type="text" className="message-input" placeholder="Your message here.."
                       onKeyPress={handleOnKeyPress}/>
            </div>
        </div>
    );
}

export default Chat;