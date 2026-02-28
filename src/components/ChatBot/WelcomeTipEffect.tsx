import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

export type Message = {
  role: "user" | "bot";
  content: string;
  timestamp: string;
};

export const WelcomeTipEffect = (setShowWelcomeTip: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeTip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, [setShowWelcomeTip]);
};

export const InitialWelcomeMessage = (
  isOpen: boolean,
  messages: Message[],
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date();
      const hour = now.getHours();
      let greeting = "Hello";

      if (hour < 12) greeting = "صباح الخير";
      else if (hour < 18) greeting = "يسعدلي اوقاتك";
      else greeting = "مساء الخير";

      const welcomeMessage: Message = {
        role: "bot",
        content: `${greeting},انا مساعدك الذكي سند. كيف يمكنني مساعدتك اليوم؟`,
        timestamp: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages, setMessages]);
};
