import React, {useState} from 'react';
import SockJsClient from 'react-stomp';
import './App.css';

import Chat from "./components/Chat/Chat";
import SignIn from "./components/SignIn/SignIn";
import {randomColor} from "./utils/common";
import User from "./modal/User";
import ChatAPIService from "./services/ChatAPIService";
import Message from './modal/Message';

const WEB_SOCKET_URL: string = 'http://localhost:8280/ws-chat/';
const App = () => {
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleLogin = (username: string) => {
        setLoggedUser(new User(username, randomColor()));
    }

    const handleSendMessage = async (msg: string) => {
        if (connected && loggedUser) {
            await ChatAPIService.sendMessage(loggedUser?.username, msg);
        }
    }

    const handleOnMessageReceived = (message) => setMessages(prevState => prevState.concat(message));

    return (
        <div className="App">
            {loggedUser === null ?
                <SignIn onSubmit={handleLogin}/> :
                (
                    <>
                        <SockJsClient
                            url={WEB_SOCKET_URL}
                            topics={['/topic/group']}
                            onConnect={() => setConnected(true)}
                            onDisconnect={() => setConnected(false)}
                            onMessage={(message) => handleOnMessageReceived(message)}/>
                        <Chat currentUser={loggedUser} messages={messages} onSend={handleSendMessage}/>
                    </>
                )}
        </div>
    );
}

export default App;
