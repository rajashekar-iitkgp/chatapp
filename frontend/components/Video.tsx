'use client';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:5000');

export default function VideoCall() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing camera:", error));

    socket.on('signal', (data) => {
      if (stream) {
        const peer = new SimplePeer({ initiator: false, trickle: false, stream });
        peer.signal(data.signal);
        setPeer(peer);
      }
    });

    return () => socket.off('signal');
  }, [stream]);

  const startCall = () => {
    if (stream) {
      const peer = new SimplePeer({ initiator: true, trickle: false, stream });
      peer.on('signal', (signal) => socket.emit('signal', { signal }));
      setPeer(peer);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <video ref={videoRef} autoPlay className="w-64 h-64 border-2 border-gray-500 rounded-lg" />
      <button 
        onClick={startCall} 
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
      >
        Start Call
      </button>
    </div>
  );
}
