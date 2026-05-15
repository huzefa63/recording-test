"use client";

import { useEffect, useRef, useState } from "react";
import { useVideoCallContext } from "../providers/VideoCallProvider";
import { useCallingFn } from "../socket-listeners/Socket";
import { useSession } from "next-auth/react";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiPhoneOff,
} from "react-icons/fi";
function VideoCallUI() {
  const session = useSession();
  const videoRef = useRef(null);
  const {localVideoRef,isCalling,isIncoming,isInCall,callerId,remoteVideoRef} = useVideoCallContext();
  const {dummyAnsCall,acceptCall} = useCallingFn();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if(!isInCall) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isInCall]);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");

    return `${hours}:${mins}:${secs}`;
  };
  useEffect(() => {
   
    let stream;

    async function getMedia() {
       if (isCalling) return;
       
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 60 },
          },
          audio: {
            sampleRate: 48000,
            channelCount: 2,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log(err);
      }
    }

    getMedia();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [isCalling]);

  return (
    <>
      <div className="h-[12vh] w-full absolute bottom-0 left-0 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-6">
        {/* Timer */}
        <div className={`${!isInCall && 'opacity-0'} text-white text-lg font-semibold tracking-wide`}>
          {formatTime(seconds)}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-5">
          {/* Mute Button */}
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center text-white shadow-lg active:scale-95">
            {/* Change icon conditionally */}
            <FiMic size={20} />
            {/* <FiMicOff size={24} /> */}
          </button>

          {/* Camera Button */}
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center text-white shadow-lg active:scale-95">
            {/* Change icon conditionally */}
            <FiVideo size={20} />
            {/* <FiVideoOff size={24} /> */}
          </button>

          {/* End Call Button */}
          <button
            onClick={() => acceptCall(session.data.currentUser._id, callerId)}
            className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 flex items-center justify-center text-white shadow-xl active:scale-95"
          >
            <FiPhoneOff size={20} />
          </button>
        </div>

        {/* Empty div for perfect center alignment */}
        <div className="w-[60px]" />
      </div>
      <div className="fixed h-[90vh] w-full inset-0 z-10000">
        {(isCalling || isIncoming) && !isInCall && (
          <>
            {isCalling && !isIncoming && (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="h-full w-full object-cover z-99999"
              />
            )}
            {!isCalling && isIncoming && (
              <video
                muted
                ref={videoRef}
                autoPlay
                className="w-full h-full object-cover"
              ></video>
            )}
          </>
        )}
        {(isCalling || isIncoming) && isInCall && (
          <>
            <div className="h-full w-full">
              <div className="absolute h-full w-full">
                <video
                  className="h-full w-full object-cover z-99999"
                  ref={remoteVideoRef}
                ></video>
              </div>
              <div className="absolute top-0 right-0 w-30 h-40 ">
                {isIncoming && !isCalling && (
                  <video
                    ref={localVideoRef}
                    muted
                    autoPlay
                    className="h-full w-full object-cover z-99999"
                  ></video>
                )}
                {!isIncoming && isCalling && (
                  <video
                    ref={localVideoRef}
                    muted
                    autoPlay
                    className="h-full w-full object-cover z-99999"
                  ></video>
                )}
              </div>
            </div>
            {/* <video
            ref={videoRef}
            autoPlay
            className="h-full w-full object-cover z-99999"
          /> */}
            <button className="bg-red-500 absolute bottom-5 left-1/2 -translate-x-1/2">
              end call
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default VideoCallUI;
