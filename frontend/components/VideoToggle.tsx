import { useState } from "react";

const VideoToggle = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  return (
    <button className="bg-gray-700 text-white p-2 rounded mt-2" onClick={toggleVideo}>
      {isVideoOn ? "Turn Video Off" : "Turn Video On"}
    </button>
  );
};

export default VideoToggle;
