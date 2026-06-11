'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CiFilter, CiUser } from "react-icons/ci";
import { FaGraduationCap } from "react-icons/fa";
import { useUser } from "../providers/UserProvider";
import CreateLeave from "./CreateLeave";

function LeaveFilters() {
    const {user} = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        // alert(params.get('status'))
        if(params.get('status') && params.get('user')) return;
        params.set('status','remaining');
        params.set('user','student');
        router.replace(`${pathname}?${params}`);
    },[])
    function handleChangeSearchParams(type,value){
        const params = new URLSearchParams(searchParams);
        params.set(type, value);
        router.replace(`${pathname}?${params}`);
    }
  return (
    <div className="space-y-5">
     {user?.role === 'admin' && <div className="grid grid-cols-2 gap-5">
        <button onClick={()=>handleChangeSearchParams('user','student')} className="flex items-center gap-2 justify-center bg-(--bg-tertiary)/50 py-3 rounded-md shadow-(--shadow-sm)">
          <FaGraduationCap className="text-2xl" />{" "}
          <span className="text-xs">Students</span>
        </button>
        <button onClick={()=>handleChangeSearchParams('user','teacher')} className="flex items-center gap-2 justify-center bg-(--card) py-3 rounded-md shadow-(--shadow-sm)">
          <CiUser className="text-2xl" />{" "}
          <span className="text-xs">Teacher</span>
        </button>
      </div>}

      <div className={`${user?.role !== 'admin' && 'space-x-5'} w-full flex items-center justify-between`}>
       {user?.role === 'admin' && <input
          type="text"
          placeholder="search..."
          className="focus:outline-0 px-5 rounded-md w-3/4 bg-(--card) border border-(--border) shadow-(--shadow-sm) h-10"
        />}
       {/* {user?.role !== 'admin' && <div
          className=" shadow-(--shadow-sm) h-10"
        />} */}
        {user?.role !== 'admin' && <CreateLeave />}
        <button className="w-1/5 bg-(--card) h-10 px-4 shadow-(--shadow-sm) rounded-md flex items-center gap-2">
          <CiFilter className="text-xl" />
          <span className="text-sm">Filter</span>
        </button>
      </div>
    </div>
  );
}

export default LeaveFilters;
