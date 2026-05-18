'use client';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import RecordingEntry from "../RecordingEntry";
import RecordingsTableController from "./RecordingsTableController";
import axios from "axios";

function RecordingsContainer({session,params}) {
     const { data: recordingsData } = useQuery({
       queryKey: ["recordings",params],
       queryFn: getRecordings,
       refetchOnWindowFocus: false,
       placeholderData:keepPreviousData
     });
     async function getRecordings(){
         try {
        //    console.log(process.env.NEXT_PUBLIC_URL);
           const res = await axios.get(
             `${process.env.NEXT_PUBLIC_URL}/recording/getRecordings?page=${params.page || 1}&student=${params.student || ""}&teacher=${params.teacher || ""}&startDate=${params.startDate || ""}&endDate=${params.endDate || ""}`,
             {
               headers: { Authorization: `Bearer ${session.jwt}` },
             },
           );
        //    console.log(res.data)
           return res.data;
        //    totalRes = res.data.totalResults;
           // console.log(data);
         } catch (err) {
           console.log("failed");
           console.log(err);
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
