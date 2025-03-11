import { useEffect, useRef, useState } from "react";

export const useVideoCall = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    if (isVideoOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } else {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
    }
  }, [isVideoOn]);

  return { videoRef, isVideoOn, toggleVideo: () => setIsVideoOn((prev) => !prev) };
};
