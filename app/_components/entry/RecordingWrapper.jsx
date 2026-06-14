'use client';
import { useQueryClient } from "@tanstack/react-query";
import useAudioRecorder from "../../_hooks/useAudioRecorder";
import StartRecording from "./StartRecording";
import { useVideoCallContext } from "../providers/VideoCallProvider";
import RecordingInProgress from "./RecordingInProgress";
import SubmitRecording from "./SubmitRecording";

function RecordingWrapper({studentName,studentId}) {
    // const session = useSession();
    const {
      states: {
        isRecording,
        isRecorded,
        isPause,
        isSubmitting,
        confirmSubmit,
        clientAudioUrl,
        confirmFinishRecording,
        hours,
        minutes,
        seconds,
        audioSize
      },

      actions: {
        startRecording,
        handlePause,
        handleResume,
        finishRecording,
        submitRecording,
        setConfirmSubmit,
        setIsRedirect,
        handleConfirmFinishRecording,
        setConfirmFinishRecording,
      },
    } = useAudioRecorder();
    // const { startCall, dummyStartCall } = useCallingFn();
    const { onlineClassBlob, onlineClassBlobUrl } = useVideoCallContext();
    const queryClient = useQueryClient();
    async function confirmSubmitHandler() {
      setConfirmSubmit(false);
      try {
        await submitRecording(studentId);
        queryClient.invalidateQueries(["myStudents"]);
      } catch (err) {
        console.log(err);
      }
    }
    // return <StartRecording />
    // return <RecordingInProgress hours={hours} minutes={minutes} seconds={seconds} isPause={isPause} handlePause={handlePause} handleResume={handleResume}/>
    if (!isRecording && !isRecorded && !onlineClassBlobUrl){
        return<StartRecording startRecording={startRecording} studentName={studentName}/>
    }
    if (isRecording && !onlineClassBlobUrl){
        return (
          <RecordingInProgress
            studentName={studentName}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isPause={isPause}
            handlePause={handlePause}
            handleResume={handleResume}
            finishRecording={finishRecording}
            confirmFinishRecording={confirmFinishRecording}
            setConfirmFinishRecording={setConfirmFinishRecording}
          />
        );
    }
    if (isRecorded || onlineClassBlobUrl){
      return <SubmitRecording studentId={studentId} jwt={jwt} isSubmitting={isSubmitting} submitRecording={submitRecording} studentName={studentName} audioSize={audioSize} clientAudioUrl={clientAudioUrl}/>
    }
}

export default RecordingWrapper
