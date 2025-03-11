import { useEffect, useState } from "react";
import { socket } from "../config/socket";

interface Message {
  sender: string;
  message: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="border border-gray-600 p-4 rounded-lg h-80 overflow-y-auto bg-gray-800 text-white">
      {messages.length === 0 ? (
        <p className="text-gray-400 text-center">No messages yet...</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 max-w-xs rounded-lg ${
              msg.sender === "me"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-700 text-white"
            }`}
          >
            <strong className="block text-sm">{msg.sender}:</strong>
            <p className="text-sm">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatBox;
