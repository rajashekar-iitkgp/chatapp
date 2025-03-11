'use client';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Input } from '@/components/ui/input';

const socket = io('http://localhost:5000');

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('message');
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 w-1/2 mx-auto">
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="border p-2 h-64 overflow-auto">
        {messages.map((msg, i) => (
          <div key={i} className="p-1">{msg}</div>
        ))}
      </div>
      <div className="flex mt-2">
        <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white">Send</button>
      </div>
    </div>
  );
}
