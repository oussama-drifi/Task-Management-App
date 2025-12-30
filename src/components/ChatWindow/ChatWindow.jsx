import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeChatWindow, toggleChatWindow } from '../../store/slices/uiSlice';
import { aiUpdateTasks } from '../../store/slices/taskSlice';
import './ChatWindow.css';

const ChatWindow = () => {
    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.ui.chatWindowOpen);

    const [history, setHistory] = useState([]);

    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI task assistant. I can help you create, update, or organize your tasks.", sender: 'ai' }
    ]);

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessageToAI = async (userMessage) => {
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_prompt: userMessage,
                    history: history
                }),
            });
            const data = await response.json();

            // update
            setHistory(data.history);
            setMessages(prev => [
                ...prev,
                { id: Date.now(), text: data.response, sender: 'ai' }
            ]);

            try {
                const response = await fetch('http://127.0.0.1:5000/api/tasks');
                const tasks = await response.json();
                // Update global state with AI-modified tasks
                dispatch(aiUpdateTasks(tasks.tasks));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }

        } catch (error) {
            console.error('Error sending message to AI:', error);
            setMessages(prev => [
                ...prev,
                { id: Date.now(), text: "Sorry, I'm having trouble connecting. Please try again.", sender: 'ai' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        sendMessageToAI(inputValue);
    };

    const handleClose = () => dispatch(closeChatWindow());

    if (!isOpen) {
        return (
            <button 
                className="chat-toggle-btn"
                onClick={() => dispatch(toggleChatWindow())}
            >
                💬 Chat with AI
            </button>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>AI Task Assistant</h3>
                <button className="close-btn" onClick={handleClose}>×</button>
            </div>
        
        <div className="messages-container">
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                >
                    <div className="message-content">
                        {msg.text}
                    </div>
                    <div className="message-sender">
                        {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="message ai-message">
                    <div className="message-content typing">
                    AI is thinking...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AI to help with tasks..."
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()}>
                {isLoading ? '...' : 'Send'}
            </button>
        </form>
        </div>
    );
};

export default ChatWindow;