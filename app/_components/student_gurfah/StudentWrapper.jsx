'use client';
import { Playfair_Display } from "next/font/google";
import { FaRegClock, FaSpinner, FaUser, FaVideo } from "react-icons/fa"
import { SlCalender } from "react-icons/sl";
import { useCallingFn } from "../socket-listeners/Socket";
import { useVideoCallContext } from "../providers/VideoCallProvider";
import SubmitRecording from "../entry/SubmitRecording";
import useAudioRecorder from "@/app/_hooks/useAudioRecorder";
import { useUser } from "../providers/UserProvider";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { format, formatDistanceToNow } from "date-fns";

const font = Playfair_Display({
    subsets:['latin'],
    weight:['500','600','700']
})
function StudentWrapper() {
    const {user} = useUser();
    const params = useParams();
    const id = params?.id;
    const {startCall} = useCallingFn();
    const {onlineClassBlob,onlineClassBlobUrl,onlineClassBlobUrlSize} = useVideoCallContext();
    const {actions:{submitRecording},states:{isSubmitting}} = useAudioRecorder();

    const {data,isFetching} = useQuery({
      queryKey:['gurfahData'],
      queryFn:handleGetQuery,
      refetchOnWindowFocus:false,
    })

    async function handleGetQuery(){
      try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/gurfah/get/${id}`,{withCredentials:true});
        console.log(res.data)
        return res.data;
      }catch(err){
        console.log(err);
        return {};
      }
    }
    if(isFetching) return <div><ImSpinner2 className="animate-spin absolute top-1/2 left-1/2 -translate-1/2"/></div>
    if(!onlineClassBlob) return (
      <div className="mt-5 w-full flex flex-col gap-5 items-center">
        <div className="flex flex-col items-center gap-">
          <div className="p-4 rounded-full bg-(--bg-tertiary)/50">
            <FaUser className="text-4xl" />
          </div>
          <h1
            className={`${font.className} mt-1 text-2xl font-bold tracking-wide`}
          >
            {data?.user && !isFetching ? (
              data?.user?.name
            ) : (
              <span className="text-2xl opacity-0">n</span>
            )}
          </h1>
          <div className={` text-xs mt-1 flex items-center gap-1`}>
            <p
              className={`h-2 w-2  rounded-full ${data.user.status === "online" ? 'bg-green-500':'bg-red-500'}`}
            ></p>{" "}
            {data.user.status === "online" ? 'online':'offline'}
          </div>
        </div>
        <button
          onClick={() => startCall(id, user?._id)}
          className="flex gap-3 items-center w-full justify-center bg-purple-500 shadow-(--shadow-lg) py-4 rounded-lg text-white/90"
        >
          <FaVideo /> Start video Call
        </button>

        <div className="flex w-full gap-6 items-center bg-(--card) rounded-md shadow-(--shadow-sm) p-5">
          <div className="p-3 rounded-full bg-yellow-100">
            <FaRegClock className="text-2xl text-yellow-500" />
          </div>
          <div className="text-(--text-secondary) text-xs font-semibold">
            <p>Last Session</p>
            {data?.classes?.length > 0 && (
              <>
                <p className="text-lg text-(--text)">
                  {formatDistanceToNow(data.classes[0].createdAt, {
                    addSuffix: true,
                  })}
                </p>
                <p>
                  {format(data.classes[0].createdAt, "MMM dd, yyy")} ~{" "}
                  {data.classes[0].duration} min
                </p>
              </>
            )}
            {data?.classes?.length < 1 && (
              <p className="font-bold text-lg">No Last Session!</p>
            )}
          </div>
        </div>
        <div className="bg-(--card) rounded-md shadow-(--shadow-sm) p-5 w-full flex flex-col gap-3">
          <p>Recent Sessions</p>
          {data?.classes?.map((el) => {
            return (
              <div
                key={el._id}
                className="flex w-full gap-6 items-center border-b border-(--border) pb-3"
              >
                <div className="p-3 rounded-full bg-green-100">
                  <SlCalender className="text-lg text-green-500" />
                </div>
                <div className="text-(--text-secondary) text-xs font-semibold flex justify-between w-full ">
                  <p>{format(el.createdAt, "MMM dd, yyy")}</p>
                  <p>{el.duration} min</p>
                </div>
              </div>
            );
          })}
          {data?.classes?.length < 1 && (
            <div className="text-center font-bold text-(--text-secondary) py-5">
              No Recent Sessions!
            </div>
          )}
        </div>
      </div>
    );
    if(onlineClassBlob && user?.role !== 'student') return <SubmitRecording audioSize={onlineClassBlobUrlSize} clientAudioUrl={onlineClassBlobUrl} studentId={id} submitRecording={submitRecording} isSubmitting={isSubmitting}/>
}

export default StudentWrapper
