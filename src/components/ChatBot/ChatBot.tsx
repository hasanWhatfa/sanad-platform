import { useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './ChatBot.css'
import { PiChatCircle } from "react-icons/pi";
import { BsChat, BsStop } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
type Message = {
  role: "user" | "bot";
  content: string;
  timestamp: string;
};

const ChatBot = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showWelcomeTip, setShowWelcomeTip] = useState<boolean>(true);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeTip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date();
      const hour = now.getHours();
      let greeting = "مرحباً";

      if (hour < 12) greeting = "صباح الخير";
      else if (hour < 18) greeting = "مساء الخير";
      else greeting = "مساء الخير";

      const welcomeMessage: Message = {
        role: "bot",
        content: `${greeting}, أنا مساعدك الشخصي. أنا جاهز للإجابة على أسئلتك.`,
        timestamp: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const sendMessage = async (customInput?: string) => {
    const messageToSend = customInput ?? input;
    if (!messageToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = { role: "user", content: messageToSend, timestamp };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!res.ok) throw new Error("API Error");

      const data: { response: string } = await res.json();
      const fullResponse = data.response;
      let index = 0;

      setTypingMessage("");

      const typingInterval = setInterval(() => {
        setTypingMessage((prev) => (prev ?? "") + fullResponse.charAt(index));
        index++;

        if (index >= fullResponse.length) {
          clearInterval(typingInterval);
          const botMessage: Message = {
            role: "bot",
            content: fullResponse,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, botMessage]);
          setTypingMessage(null);
        }
      }, 30); // speed per character
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Welcome Tip */}
      <AnimatePresence>
        {showWelcomeTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="welcome-tip"
          >
            <p className="tip-title">أنا مساعدك الشخصي. 👋</p>
            <p>كيف يمكنني مساعدتك؟</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="chatbot-toggle"
        aria-label="Open Chatbot"
      >
        {/* <img src="/images/chatbot/chatIconw.svg" alt="Chat Icon" /> */}
        <PiChatCircle />
      </button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <BsChat />
                <div>
                  <h2>مساعد سند</h2>
                  <p>دليل ذكي</p>
                </div>
              </div>
              {/* Close Button */}
              <button onClick={() => setIsOpen(false)} className="chatbot-close-btn">
                ×
              </button>
            </div>

            {/* Chat Body */}
            <div className="chatbot-body">
              <div className="chatbot-body-layout"></div>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
                >
                  {msg.role === "bot" && (
                    <div className="message-meta">
                      مساعد سند • {msg.timestamp}
                    </div>
                  )}
                  <div className="message-bubble">
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing Effect */}
              {typingMessage && (
                <div className="typing-message">
                  <div className="message-meta">
                    مساعد سند • يكتب...
                  </div>
                  <div className="message-bubble">
                    {typingMessage}
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions – just after body, before input */}
            {messages.length === 1 && messages[0].role === "bot" && (
              <div className="suggested-questions">
                <p className="suggested-questions-text">يمكنك أن تسأل:</p>
                <div className="suggested-questions-list">
                  {[
                    "ما هي الخدمات التي تقدمونها؟",
                    "كيف يمكنني حجز جولة؟",
                    "هل لديكم عروض خاصة؟",
                  ].map((question) => (
                    <button
                      key={question}
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Field */}
            <div className="chatbot-input-container">
              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="اسأل أي شيء..."
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
              >
                {loading ? <BsStop /> : <BiSend />}
                {/* {loading ? <img src="/images/chatbot/stop.svg" alt="Stop" /> : <img src="/images/chatbot/send.svg" alt="Send" />} */}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;