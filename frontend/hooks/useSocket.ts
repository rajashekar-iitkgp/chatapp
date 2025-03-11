import { useEffect, useState } from "react";
import { socket } from "@/config/socket";

export const useSocket = () => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return { messages };
};
