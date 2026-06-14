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
    // useEffect(() => {
    //     const params = new URLSearchParams(searchParams);
    //     // alert(params.get('status'))
    //     if(params.get('status') && params.get('user')) return;
    //     params.set('status','pending');
    //     params.set('user','student');
    //     router.replace(`${pathname}?${params}`,{scroll:false});
    // },[])
    function handleChangeSearchParams(type,value){
        const params = new URLSearchParams(searchParams);
        params.set(type, value);
        router.replace(`${pathname}?${params}`,{scroll:false});
    }
  return (
    <>
      <div className="space-y-5 ">
        {/* {user?.role === 'admin' && <div
          className={`${user?.role !== "admin" && "space-x-5"} w-full flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleChangeSearchParams("user", "student")}
              className={`flex hover:bg-(--primary-soft) hover:text-white hover:cursor-pointer px-4 lg:px-8 items-center gap-2 justify-center transition-all duration-300 ease-in-out py-2 rounded-md shadow-(--shadow-sm) ${searchParams.get("user") === "student" ? " bg-(--bg-tertiary)/50" : "bg-(--card)"}`}
            >
              <FaGraduationCap className="text-2xl" />{" "}
              <span className="text-xs">Students</span>
            </button>
            <button
              onClick={() => handleChangeSearchParams("user", "teacher")}
              className={`flex hover:bg-(--primary-soft) hover:text-white hover:cursor-pointer px-4 lg:px-8 items-center gap-2 justify-center transition-all duration-300 ease-in-out py-2 rounded-md shadow-(--shadow-sm) ${searchParams.get("user") === "teacher" ? " bg-(--bg-tertiary)/50" : "bg-(--card)"}`}
            >
              <CiUser className="text-2xl" />{" "}
              <span className="text-xs">Teacher</span>
            </button>
          </div>
          <button className="px-4 lg:px-8 bg-(--card) h-10  shadow-(--shadow-sm) rounded-md flex items-center gap-2">
            <CiFilter className="text-xl" />
            <span className="text-sm">Filter</span>
          </button>
        </div>} */}
        <div className="ml-auto w-fit">{user?.role !== "admin" && <CreateLeave />}</div>
      </div>
    </>
  );
}

export default LeaveFilters;
