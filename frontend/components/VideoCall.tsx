import { useEffect, useRef, useState } from "react";

const VideoCall = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
        }
      })
      .catch((error) => console.error("Error accessing camera:", error));

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        setIsStreaming(false);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="relative w-full max-w-md">
        <video ref={videoRef} autoPlay className="w-full rounded-lg border border-gray-700 shadow-md" />
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold">
            No Video Stream
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
