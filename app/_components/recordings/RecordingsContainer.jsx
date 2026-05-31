'use client';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import RecordingEntry from "../RecordingEntry";
import RecordingsTableController from "./RecordingsTableController";
import axios from "axios";
import { useUser } from "../providers/UserProvider";
import toast from "react-hot-toast";

function RecordingsContainer({params}) {
  const {user} = useUser();
     const { data: recordingsData } = useQuery({
       queryKey: ["recordings",params],
       queryFn: getRecordings,
       refetchOnWindowFocus: false,
       placeholderData:keepPreviousData,
       enabled:!!user?.name,
     });
     async function getRecordings(){
         try {
           const res = await axios.get(
             `${process.env.NEXT_PUBLIC_URL}/recording/getRecordings?page=${params.page || 1}&student=${params.student || ""}&teacher=${params.teacher || ""}&startDate=${params.startDate || ""}&endDate=${params.endDate || ""}`,
             {
               withCredentials:true,
             },
           );
           console.log(res.data)
           return res.data;
         } catch (err) {
           return [];
         }
     }
    if(recordingsData?.recordings?.length > 0)return (
      <div className="space-y-2">
        {recordingsData?.recordings?.map((el, i) => (
          <RecordingEntry key={el._id} el={el} i={i} />
        ))}
        {Array.from({ length: 10 - recordingsData?.recordings?.length }).map((el, i) => (
          <RecordingEntry key={i} isDummy />
        ))}
        <RecordingsTableController totalRes={recordingsData?.totalResults} />
      </div>
    );
}

export default RecordingsContainer
