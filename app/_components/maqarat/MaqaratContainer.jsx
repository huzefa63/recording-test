'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUserFriends } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { IoBookOutline, IoCalendarOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { useUser } from "../providers/UserProvider";
import { format } from "date-fns";

function MaqaratContainer() {
    const {user} = useUser();
    const {data:maqarat,isLoading} = useQuery({
        queryKey:['maqarat'],
        queryFn:handleGetMaqarat,
        refetchOnWindowFocus:false,
    })
    async function handleGetMaqarat(){
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/maqarat/get`,{withCredentials:true});
            console.log('sucess')
            console.log(res.data.maqarat.length)
            return res.data.maqarat; 
        }catch(err){
            console.log(err);
            return [];
        }
    }
    if(!user) return null;
    if(isLoading) return null;
    if(!isLoading && maqarat?.length === 0) return (
      <div className="w-full h-3/4 flex items-center justify-center">
       {user?.role === 'admin' && <h1>Start Creating Maqarat Session</h1>}
       {(user?.role === 'student' || user?.role === 'teacher') && <h1>No Previous sessions found!</h1>}
      </div>
    );
    return (
      <div className="mt-5">
        <h1 className="font-bold">Past Maqarat Sessions</h1>
        <div className="flex flex-col gap-3 mt-3">
          {maqarat.map(el => <MaqaratSessionCard key={el._id} juz={el.juz} batch={el.batch} teacher={el.teacher.name} date={el.date} students={el.students}/>)}
        </div>
      </div>
    );
}

export default MaqaratContainer


function MaqaratSessionCard({juz,batch,teacher,date,students}){
    const today = new Date();
    const sessionDate = new Date(date);
    today.setHours(0,0,0,0);
    sessionDate.setHours(0,0,0,0)
    const isUpcoming = sessionDate > today;
    const isToday = sessionDate.getTime() === today.getTime();
    return (
      <div className="relative flex w-full rounded-md border border-(--border) shadow-(--shadow-sm) p-3 bg-(--card)">
        <div className={`absolute right-1 top-1 p-1 px-3 ${isToday && 'bg-blue-400'} ${(!isToday && isUpcoming) && 'bg-green-400'} ${(!isToday && !isUpcoming) && 'bg-red-400'} shadow-sm rounded-md`}> 
            {isToday && <p className="text-[0.60rem] text-white tracking-wider">{isToday && 'today'}</p>}
            {!isToday && <p className="text-[0.60rem] text-white tracking-wider">{isUpcoming ? 'upcoming' :'ended'}</p>}
        </div>
        <div className="flex gap-5 border-r border-(--border) pr-2 w-[55%]">
          <div className="p-3 rounded-full bg-(--bg-tertiary)/50 h-fit">
            <IoBookOutline />
          </div>

          <div className="text-[0.60rem] text-gray-600 flex flex-col gap-2">
            <h1 className="text-sm text-black font-bold">{juz}</h1>
            <div className="flex items-center gap-2 mt-2">
              <LuUsers />
              <p>Batch: {batch}</p>
            </div>
            <div className="flex items-center gap-2">
              <LuUsers />
              <p>Teacher: {teacher}</p>
            </div>
            <div className="flex items-center gap-2">
              <LuUsers />
              <p>{students?.length} students</p>
            </div>
            <div className="flex items-center gap-2">
              <IoCalendarOutline />
              <p>{format(date, "dd MMM, yyyy")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-2 text-[0.60rem] text-gray-600 w-[45%]">
          <h1 className="text-sm font-bold text-amber-800 flex items-center gap-1">
            Students{" "}
            <span className="text-[0.60rem]">({students?.length})</span>
          </h1>
          <div className="flex flex-col gap-1">
            {students?.map((el) => (
              <p key={el?.name}>{el?.name},</p>
            ))}
          </div>
        </div>
      </div>
    );
}
