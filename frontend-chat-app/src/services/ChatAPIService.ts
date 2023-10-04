import Axios from "axios";
import Message from "../modal/Message";

const api = Axios.create({
    baseURL: 'http://localhost:8280/api/v1/chat'
});

const ChatAPIService = {
    // fetch previous messages from server
    getAllMessages: (groupId) => api.get(`messages/${groupId}`),
    // send a new message
    sendMessage: (username, message) => api.post<Message>('messages', {sender: username, content: message})
}

export default ChatAPIService;