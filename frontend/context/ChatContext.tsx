import { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextProps {
  messages: { sender: string; message: string }[];
  addMessage: (message: { sender: string; message: string }) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);

  const addMessage = (message: { sender: string; message: string }) => {
    setMessages((prev) => [...prev, message]);
  };

  return <ChatContext.Provider value={{ messages, addMessage }}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
