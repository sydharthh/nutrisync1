import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/Chatbot.module.css';

const Chatbot = ({ isLoggedIn }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const API_KEY = "ZkmejyJnCiBGZKK6bBIPRrB5C8Zjyvtmu3TTAYRx";

  const nutriSyncInfo = {
    introduction: "NutriSync is an AI-driven diet planning and food delivery app designed to help individuals with personalized diet plans, meal suggestions, meal delivery scheduling, and nutrition tracking.",
    features: "Key features include personalized diet plans, AI-driven meal suggestions, sleep and recovery optimization, location-based meal delivery, subscription management, and progress tracking.",
    purpose: "NutriSync aims to promote healthy eating and wellness by offering users the convenience of meal delivery and precise nutrition tracking to help them meet their health and fitness goals."
  };

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    let botMessageText = "Sorry, I couldn't understand that.";

    if (input.toLowerCase().includes("nutrisync")) {
      if (input.toLowerCase().includes("what is")) {
        botMessageText = nutriSyncInfo.introduction;
      } else if (input.toLowerCase().includes("features")) {
        botMessageText = nutriSyncInfo.features;
      } else if (input.toLowerCase().includes("purpose")) {
        botMessageText = nutriSyncInfo.purpose;
      } else {
        botMessageText = "NutriSync is a platform to help you plan your meals and track your nutrition. You can ask more specific questions about its features!";
      }
    } else {
      try {
        const response = await axios.post(
          "https://api.cohere.com/v1/chat",
          {
            message: input,
            model: "command",
            chat_history: [],
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        botMessageText = response.data.text || "Sorry, I couldn't understand that.";
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        botMessageText = "Error getting response.";
      }
    }

    setMessages(prevMessages => [...prevMessages, { text: botMessageText, sender: "bot" }]);
    setInput('');
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isLoggedIn) return null;

  return (
    <div className={styles['chatbot-container']}>
      <div className={styles['chat-header']}>
        <h5>Nutrition Chatbot</h5>
        <small>Ask me about nutrition and NutriSync!</small>
      </div>

      {/* Chatbox */}
      <div ref={chatBoxRef} className={styles['chat-box']}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles['chat-message']} ${msg.sender === "user" ? styles['user-message'] : styles['bot-message']}`}>
            <div className={`${styles['message-bubble']} ${msg.sender === "user" ? styles['user-bubble'] : styles['bot-bubble']}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className={styles['input-group']}>
        <input
          type="text"
          className={styles['chat-input']}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about nutrition or NutriSync..."
        />
        <button className={styles['send-btn']} onClick={handleChat}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
