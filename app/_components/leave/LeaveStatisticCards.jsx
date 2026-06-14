'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
function LeaveStatisticCards() {
  const searchParams = useSearchParams();
    const {data} = useQuery({
        queryKey:['leaveStatistics',searchParams.get('user')],
        queryFn:handleGetLeaveStatistics
    });

    async function handleGetLeaveStatistics(){
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/leave/getStatistics?user=${searchParams.get('user')}`,{withCredentials:true});
            return res.data;
        }catch(err){
            console.log(err);
            return [];
        }
    }
  const status = searchParams.get('status');
    const router = useRouter();
      const pathname = usePathname();
      function handleChangeSearchParams(type,value){
          const params = new URLSearchParams(searchParams);
          params.set(type, value);
          router.replace(`${pathname}?${params}`);
      }
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-10 gap-y-4">
      <button
        onClick={() => handleChangeSearchParams("status", "upcoming")}
        className={`border-3   hover:bg-(--card-highlight) hover:cursor-pointer ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "upcoming" ? " bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : "border-transparent"}`}
      >
        <div className="w-full flex justify-between items-center">
          <IoCalendarOutline className="text-2xl text-(--primary)" />
          <p className="flex items-center justify-center h-6 w-6 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            {data?.upcoming}
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Total</p>
      </button>

      <button
        onClick={() => handleChangeSearchParams("status", "accepted")}
        className={`border-3  hover:bg-(--card-highlight) hover:cursor-pointer ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "accepted" ? "bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : "border-transparent"}`}
      >
        <div className="w-full flex justify-between items-center">
          <CiCircleCheck className="text-3xl text-green-500" />
          <p className="flex items-center justify-center h-6 w-6 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            {data?.accepted}
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Accepted</p>
      </button>

      <button
        onClick={() => handleChangeSearchParams("status", "rejected")}
        className={`border-3  hover:bg-(--card-highlight) hover:cursor-pointer ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "rejected" ? "bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : "border-transparent"}`}
      >
        <div className="w-full flex justify-between items-center">
          <IoIosCloseCircleOutline className="text-3xl text-red-500" />
          <p className="flex items-center justify-center h-6 w-6 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            {data?.rejected}
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Rejected</p>
      </button>

      <button
        onClick={() => handleChangeSearchParams("status", "pending")}
        className={`border-3 hover:bg-(--card-highlight) hover:cursor-pointer ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "pending" ? "bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : "border-transparent"}`}
      >
        <div className="w-full flex justify-between items-center">
          <GoClock className="text-2xl text-(--primary)" />
          <p className="flex items-center justify-center h-6 w-6 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            {data?.pending}
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Pending</p>
      </button>
    </div>
  );
}

export default LeaveStatisticCards;
