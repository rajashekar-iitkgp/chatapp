import { useState } from "react";
import { socket } from "@/config/socket";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", { sender: "You", message });
      setMessage("");
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2 p-2 bg-gray-800 rounded-lg">
      <input
        className="border border-gray-600 bg-gray-900 text-white p-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 disabled:bg-gray-500"
        onClick={sendMessage}
        disabled={!message.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
