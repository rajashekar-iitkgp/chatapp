import ChatBox from "@/components/ChatBox";
import MessageInput from "@/components/MessageInput";
import UserList from "@/components/UserList";
import VideoCall from "@/components/VideoCall";
import VideoToggle from "@/components/VideoToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Live Chat</h1>
      <UserList />
      <ChatBox />
      <MessageInput />
      <VideoCall />
      <VideoToggle />
    </div>
  );
}
