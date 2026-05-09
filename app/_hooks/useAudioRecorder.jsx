import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isPause, setIsPause] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState();
    const [clientAudioUrl, setClientAudioUrl] = useState("");
    const [isRedirect, setIsRedirect] = useState(false);
    const [confirmSubmit, setConfirmSubmit] = useState(false);

    const router = useRouter();

    let audioChunks = [];
    const recorder = useRef(null);
    const interval = useRef(null);
    const stream = useRef(null);

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
     async function startRecording() {
       setIsRecording(true);

       stream.current = await navigator.mediaDevices.getUserMedia({
         audio: {
           echoCancellation: false,
           noiseSuppression: false,
           autoGainControl: false,
           channelCount: 2,
           sampleRate: 48000,
         },
         video: false,
       });
       interval.current = setInterval(() => {
         setTotalSeconds((seconds) => seconds + 1);
       }, 1000);

       console.log("recording");
       recorder.current = new MediaRecorder(stream.current, {
         mimeType: "audio/webm;codecs=opus",
         audioBitsPerSecond: 256000,
       });
       recorder.current.ondataavailable = (e) => {
         // console.log('data avialable')
         audioChunks.push(e.data);
       };
       recorder.current.onstop = (e) => {
         const blob = new Blob(audioChunks, { type: "audio/webm" });
         console.log(blob.size / 1024 / 1024);
         const url = URL.createObjectURL(blob);
         setClientAudioUrl(url);
         setAudio(blob);
       };

       recorder.current.start();
     }

     function handlePause() {
       clearInterval(interval.current);
       interval.current = null;
       recorder.current.pause();
       setIsPause(true);
     }
     function handleResume() {
       interval.current = setInterval(() => {
         setTotalSeconds((seconds) => seconds + 1);
       }, 1000);
       recorder.current.resume();
       setIsPause(false);
     }

     function finishRecording() {
       setIsRecording(false);
       setTotalSeconds(0);
       if (interval.current) clearInterval(interval.current);
       if (recorder.current) recorder.current.stop();
       if (recorder.current) recorder.current = null;
       if (stream.current)
         stream.current.getTracks().forEach((track) => track.stop());
       setIsRecorded(true);
     }

     async function submitRecording() {
       const formData = new FormData();
       formData.append("audio", audio, "recording.webm");
       formData.append("student", "aliasgar kagzi");
       formData.append("muhaffiz", "huzefa ratlam");
       try {
         setIsSubmitting(true);
         setConfirmSubmit(false);
         console.log(formData.get("audio"));
         await axios.post(
           `${process.env.NEXT_PUBLIC_URL}/entry/recording`,
           formData,
         );
         toast.success("recording uploaded");
         if (isRedirect) return router.push("https://www.elearningquran.com");
         else return router.push("/recordings");
       } catch (err) {
         toast.error("failed to upload recording");
         console.log(err)
       } finally {
         setIsSubmitting(false);
       }
     }

    return {
      states: {
        isRecording,
        isRecorded,
        isPause,
        isSubmitting,
        confirmSubmit,
        clientAudioUrl,
        totalSeconds,
        hours,
        minutes,
        seconds
      },

      actions: {
        startRecording,
        handlePause,
        handleResume,
        finishRecording,
        submitRecording,
        setConfirmSubmit,
        setIsRedirect,
      },
    };
}

export default useAudioRecorder
