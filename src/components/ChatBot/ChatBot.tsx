import { useRef, useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { Message } from "./WelcomeTipEffect";
import { InitialWelcomeMessage, WelcomeTipEffect } from './WelcomeTipEffect';
import { chatbotTexts } from "../../data/chatbotData";
import { ChatHandler } from "./ChatHandler";
import "./ChatBot.css"; // استدعاء ملف الـ CSS
import {
  BsChat,
  BsSend,
  BsStop,
  BsArrowsFullscreen, // ✨ Added icon
  BsArrowsAngleContract, // ✨ Added icon
} from "react-icons/bs";
import { BiBot } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // ✨ Added state for expand/collapse
  const [showWelcomeTip, setShowWelcomeTip] = useState(true);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [isVisible] = useState(true);

  // useEffect(() => {
  //   const toggleVisibility = () => {
  //     if (window.scrollY > 200) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   window.addEventListener('scroll', toggleVisibility);
  //   return () => window.removeEventListener('scroll', toggleVisibility);
  // }, []);

  // Show welcome tip effect on mount
  WelcomeTipEffect(setShowWelcomeTip);

  // Add initial welcome message if chat is opened and empty
  InitialWelcomeMessage(isOpen, messages, setMessages);

  // Close chat on any click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatRef.current &&
        !chatRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Send user message and receive bot response
  const { sendMessage } = ChatHandler(
    setMessages,
    setTypingMessage,
    setLoading,
    setInput
  );

  // Handle user input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Send message on Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <div className="chatbot-container">
      {/* Welcome Tip */}
      {showWelcomeTip && isVisible && (
        <div className="welcome-tip">
          <p className="font-semibold mb-1">{chatbotTexts.welcomeTitle}</p>
          <p>{chatbotTexts.welcomeMessage}</p>
        </div>
      )}

      {/* Toggle Button */}
      {isVisible && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="chatbot-toggle"
          aria-label="Open Chatbot"
        >
          <BsChat />
          <span>{chatbotTexts.toggleTitle}</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        // ✨ Added dynamic class for expansion
        <div
          ref={chatRef}
          className={`chatbot-window ${isExpanded ? "expanded" : ""}`}
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="flex items-center gap-3">
              <BiBot />
              <div>
                <h2>{chatbotTexts.headerTitle}</h2>
                <p>{chatbotTexts.headerSubtitle}</p>
              </div>
            </div>
            {/* ✨ Buttons are now in a container */}
            <div className="header-controls">
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
              >
                {isExpanded ? <BsArrowsAngleContract /> : <BsArrowsFullscreen />}
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <CgCloseO />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.role === "bot" && (
                  <div className="message-timestamp">
                    {chatbotTexts.botLabel(msg.timestamp)}
                  </div>
                )}
                {msg.content}
              </div>
            ))}

            {typingMessage && (
              <div className="typing">{typingMessage}</div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && messages[0].role === "bot" && (
            <div className="suggested">
              <p>{chatbotTexts.suggestedIntro}</p>
              <div>
                {chatbotTexts.suggestedQuestions.map((question) => (
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

          {/* Input */}
          <div className="chatbot-input">
            <input
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={chatbotTexts.placeholder}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading}
            >
              {loading ? (
                <BsStop />
              ) : (
                <BsSend />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;