// src/components/ChatInterface.js
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './chatsection.css';
import { useAuth } from '../Utils/AuthProvide';
import { FaUserCircle, FaRobot } from 'react-icons/fa';
import { fetchChatHistory, sendMessage } from '../utils/ApiCalls';

const ChatInterface = ({ selectedFile }) => {
    const [userPrompt, setUserPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const chatEndRef = useRef(null);
    const { token } = useAuth();
    const [currentFile, setCurrentFile] = useState(null);

    // Scroll to bottom whenever chatHistory changes
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, sending]);

    // Fetch chat history
    useEffect(() => {
        const loadChatHistory = async () => {
            if (!selectedFile) return;
            setLoading(true);
            try {
                const file = await fetchChatHistory(selectedFile.fileId, token);
                setCurrentFile(file);
                setChatHistory(file.chatHistory || []);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            } finally {
                setLoading(false);
            }
        };

        loadChatHistory();
    }, [selectedFile, token]);

    const handleSendMessage = async () => {
        if (!userPrompt) return;

        setSending(true);
        const newChatHistory = [...chatHistory, { sender: 'user', content: userPrompt }];
        setChatHistory(newChatHistory);
        setUserPrompt('');

        try {
            const aiResponse = await sendMessage(selectedFile.fileId, userPrompt, token);
            setChatHistory([...newChatHistory, { sender: 'assistant', content: aiResponse }]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="loading">Loading chat history...</div>;

    return (
        <div className="chat-interface">
            <h1 className='fileNamecenter'>{currentFile?.fileName}</h1>
            <div className="chat-history">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <div className="message-avatar">
                            {msg.sender === 'user' ? <FaUserCircle /> : <FaRobot />}
                        </div>
                        <ReactMarkdown className="markdown-content">{msg.content}</ReactMarkdown>
                    </div>
                ))}
                {sending && <div className="loading loading-dots">AI is processing</div>}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} disabled={sending}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
