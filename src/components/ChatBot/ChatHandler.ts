import { sendChatMessage } from "../../chatApi/chatApi";
import { chatbotTexts } from "../../data/chatbotData";
import type { Message } from "./WelcomeTipEffect";

type AutoReplies = Record<string, string>;

export const ChatHandler = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setTypingMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setInput: React.Dispatch<React.SetStateAction<string>>
) => {
  const sendMessage = async (customInput: string) => {
    if (!customInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      role: "user",
      content: customInput,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const autoReplies: AutoReplies = chatbotTexts.autoReplies;
    const autoReply = autoReplies[customInput];

    if (autoReply) {
      setTypingMessage("");

      let index = 0;
      const typingInterval = setInterval(() => {
        setTypingMessage((prev) => (prev ?? "") + autoReply.charAt(index));
        index++;

        if (index >= autoReply.length) {
          clearInterval(typingInterval);

          const botMessage: Message = {
            role: "bot",
            content: autoReply,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setMessages((prev) => [...prev, botMessage]);
          setTypingMessage(null);
        }
      }, 30);

      setLoading(false);
      return;
    }

    try {
      const res = await sendChatMessage(customInput);
      if (!res.success) throw new Error(res.message);

      const fullResponse = res.message;
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
      }, 30);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage };
};
