'use client';
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import LeaveCard from "./LeaveCard"
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiCalendar, CiUser } from "react-icons/ci";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { IoArrowBackOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import toast from "react-hot-toast";
import { useUser } from "../providers/UserProvider";

function LeaveCardsContainer({setShow,show}) {
  const {user} = useUser();
    const query = useSearchParams();
    const queryClient = useQueryClient();
    const [showLeaveDetails,setShowLeaveDetails] = useState({show:false,details:{}});
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const {data:leaves} = useQuery({
        queryKey:['leaves',query.get('status'),query.get('user')],
        queryFn:handleGetLeaves,
        placeholderData:keepPreviousData
    });

    async function handleUpdate(status) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/leave/update`,
          { leaveId: showLeaveDetails.details.id, status },
          { withCredentials: true },
        );
        queryClient.invalidateQueries({ queryKey: ["leaves"] });
        setShowLeaveDetails({show:false,details:{}});
        toast.success("leave status updated");
      } catch (err) {
        console.log(err);
        toast.error("failed to update leave status");
      }
    }
    async function handleGetLeaves(){
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/leave/get?status=${query.get('status') || ''}&user=${query.get('user') || ''}`,{withCredentials:true});
            return res.data.leaves;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    function handleChangeSearchParams(value){
      const params = new URLSearchParams(searchParams);
      params.set('status',value);
      router.replace(`${pathname}?${params}`,{scroll:false});
    }
    // if(leaves?.length < 1) return <div className="text-center mt-15 font-bold">Apply For Leave</div>
    return (
      <div className=" p-3 rounded-md h-full">
        {show && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="font-bold mb-2 text-2xl">Recent Requests</h1>
              <button
                onClick={() => {
                  setShow(false);
                  handleChangeSearchParams("pending");
                }}
                className="hover:bg-blue-100 p-2 rounded-md hover:cursor-pointer duration-300 ease-in-out transition-all text-blue-700 font-bold text-sm"
              >
                View All
              </button>
            </div>
            <div className="lg:grid grid-cols-3 flex flex-col gap-3 mt-5">
              {leaves?.slice(0, 3).map((el) => (
                <PhoneLeaveCard
                  setShowLeaveDetails={setShowLeaveDetails}
                  key={el._id}
                  id={el._id}
                  createdAt={el.createdAt}
                  status={el.status}
                  reason={el.reason}
                  name={el.name}
                  batch={el.batch}
                  type={el.type}
                  from={el.from}
                  to={el.to}
                  days={el.days}
                />
              ))}
            </div>
          </>
        )}

        {!show && (
          <div className="min-h-screen absolute p-5 bg-(--card) w-full top-0 left-0">
            <button
              onClick={() => setShow(true)}
              className="flex items-center  gap-5 p-2 rounded-md hover:bg-gray-200 mb-10"
            >
              <IoArrowBackOutline />
              Leave Request
            </button>
            <div className="grid grid-cols-4 text-center text-sm">
              <button
                onClick={() => handleChangeSearchParams("all")}
                className={`pb-3 border-b  ${searchParams.has("status", "all") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                All
              </button>
              <button
                onClick={() => handleChangeSearchParams("pending")}
                className={`pb-3 border-b ${searchParams.has("status", "pending") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                Pending
              </button>
              <button
                onClick={() => handleChangeSearchParams("accepted")}
                className={`pb-3 border-b  ${searchParams.has("status", "accepted") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                Accepted
              </button>
              <button
                onClick={() => handleChangeSearchParams("rejected")}
                className={`pb-3 border-b  ${searchParams.has("status", "rejected") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                Rejected
              </button>
            </div>
            <div className="lg:grid grid-cols-3 flex flex-col gap-3 mt-5">
              {leaves?.map((el) => (
                <PhoneLeaveCard
                  key={el._id}
                  id={el._id}
                  createdAt={el.createdAt}
                  status={el.status}
                  reason={el.reason}
                  name={el.name}
                  batch={el.batch}
                  type={el.type}
                  from={el.from}
                  to={el.to}
                  days={el.days}
                />
              ))}
            </div>
          </div>
        )}
        {!show && (
          <div className="overflow-hidden flex flex-col h-screen fixed p-5 bg-(--card) w-full top-0 left-0">
            <button
              onClick={() => {
                setShow(true);
                handleChangeSearchParams('')
              }}
              className="flex items-center w-fit  gap-5 p-2 rounded-md hover:bg-gray-200 mb-10"
            >
              <IoArrowBackOutline />
              Leave Request
            </button>
            <div className="grid grid-cols-4 text-center text-sm">
              <button
                onClick={() => handleChangeSearchParams("all")}
                className={`pb-3 border-b  ${searchParams.has("status", "all") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                All
              </button>
              <button
                onClick={() => handleChangeSearchParams("pending")}
                className={`pb-3 border-b ${searchParams.has("status", "pending") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                Pending
              </button>
              <button
                onClick={() => handleChangeSearchParams("accepted")}
                className={`pb-3 border-b  ${searchParams.has("status", "accepted") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                Accepted
              </button>
              <button
                onClick={() => handleChangeSearchParams("rejected")}
                className={`pb-3 border-b  ${searchParams.has("status", "rejected") ? "border-b-2 border-b-blue-500 text-blue-600" : "border-b-gray-200"}`}
              >
                Rejected
              </button>
            </div>
            <div className="pb-20 overflow-auto flex-1">
              <div className=" lg:grid grid-cols-2 flex flex-col gap-3 mt-5">
                {leaves?.map((el) => (
                  <PhoneLeaveCard
                    key={el._id}
                    id={el._id}
                    createdAt={el.createdAt}
                    status={el.status}
                    reason={el.reason}
                    name={el.name}
                    batch={el.batch}
                    type={el.type}
                    from={el.from}
                    to={el.to}
                    days={el.days}
                    setShowLeaveDetails={setShowLeaveDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {showLeaveDetails.show && (
          <div className="overflow-auto h-screen fixed p-5 bg-(--card) w-full top-0 left-0">
            <button
              onClick={() => {
                if(!show) setShowLeaveDetails({ show: false, details: {} });
                else{
                  setShowLeaveDetails({ show: false, details: {} });
                  handleChangeSearchParams('');
                }
              }}
              className="flex items-center  gap-5 p-2 rounded-md hover:bg-gray-200 mb-5"
            >
              <IoArrowBackOutline />
              Leave Request Details
            </button>
            <div className="lg:flex flex-col items-center lg:w-full">
              <div className="lg:w-1/2">
                <div className="relative bg-gray-50 flex gap-8 items-center border border-gray-300 rounded-md p-3 py-4">
                  <div className="p-5 rounded-full border border-gray-200">
                    <CiUser />
                  </div>
                  <div className="flex flex-col text-xs w-full">
                    <h1 className="font-bold text-lg">
                      {showLeaveDetails.details.name}
                    </h1>
                    {/* <p
                    className={`px-2 py-1 rounded-md ${showLeaveDetails.details.status === "rejected" && "bg-red-500"} ${showLeaveDetails.details.status === "accepted" && "bg-green-500"} ${showLeaveDetails.details.status === "pending" && "bg-yellow-500"} text-white absolute right-2 top-2`}
                  >
                    {showLeaveDetails.details.status}
                  </p> */}
                    <h1 className="text-gray-600 font-semibold">
                      batch - {showLeaveDetails.details.batch}
                    </h1>
                    <h1 className="text-gray-600 font-semibold">
                      Requested on{" "}
                      {format(
                        showLeaveDetails.details.createdAt,
                        "dd MMM, yyy",
                      )}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mt-5 space-y-3 py-3 border border-gray-300 rounded-md ">
                <div className="px-5 grid grid-cols-2 border-b border-gray-300 pb-3">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CiCalendar />
                    <p>Leave Type</p>
                  </div>
                  <h1 className="text-xs flex items-end">
                    {showLeaveDetails.details.type}
                  </h1>
                </div>
                <div className="px-5 grid grid-cols-2 border-b border-gray-300 pb-3">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CiCalendar />
                    <p>From Date</p>
                  </div>
                  <h1 className="text-xs flex items-end">
                    {format(showLeaveDetails.details.from, "dd MMM, yyy")}
                  </h1>
                </div>
                <div className="px-5 grid grid-cols-2 border-b border-gray-300 pb-3">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CiCalendar />
                    <p>To Date</p>
                  </div>
                  <h1 className="text-xs flex items-end">
                    {format(showLeaveDetails.details.to, "dd MMM, yyy")}
                  </h1>
                </div>
                <div className="px-5 grid grid-cols-2 border-b border-gray-300 pb-3">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <GoClock />
                    <p>Total Days</p>
                  </div>
                  <h1 className="text-xs flex items-end">
                    {showLeaveDetails.details.days} days
                  </h1>
                </div>
                <div className="px-5 grid grid-cols-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <IoChatboxEllipsesOutline />
                    <p>Reason</p>
                  </div>
                  <h1 className="text-xs flex items-end">
                    {showLeaveDetails.details.reason}
                  </h1>
                </div>
              </div>

              <div className="lg:w-1/2 mt-5 border border-gray-300 rounded-md p-3 text-xs shadow-(--shadow-sm)">
                <div className="flex items-center gap-5">
                  <GoClock />
                  <p>Approval history</p>
                </div>

                <div className="mt-5 pl-1 space-y-4">
                  <div>
                    <h1
                      className={`${showLeaveDetails.details.status === "rejected" && "text-red-500"} ${showLeaveDetails.details.status === "accepted" && "text-green-500"} ${showLeaveDetails.details.status === "pending" && "text-yellow-500"} font-bold flex items-center gap-5`}
                    >
                      <div
                        className={`relative h-3 w-3 rounded-full ${showLeaveDetails.details.status === "rejected" && "bg-red-500"} ${showLeaveDetails.details.status === "accepted" && "bg-green-500"} ${showLeaveDetails.details.status === "pending" && "bg-yellow-500"}`}
                      >
                        <p className="absolute left-1/2 top-full -translate-x-1/2 bg-gray-200 h-9 w-1 rounded-full"></p>
                      </div>
                      {showLeaveDetails.details.status}
                    </h1>
                    <p className="ml-8">
                      {showLeaveDetails.details.status === "pending" &&
                        "Waiting for approval"}
                    </p>
                    <p className="ml-8">
                      {showLeaveDetails.details.status === "rejected" &&
                        "your request was declined"}
                    </p>
                    <p className="ml-8">
                      {showLeaveDetails.details.status === "accepted" &&
                        "your request is accepted"}
                    </p>
                  </div>
                  <div>
                    <h1 className=" flex items-center gap-5">
                      <p className="h-3 w-3 rounded-full bg-gray-400"></p>
                      Requested
                    </h1>
                    <p className="ml-8">
                      {format(
                        showLeaveDetails.details.createdAt,
                        "dd MMM, yyy",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {user?.role === "admin" &&
                showLeaveDetails.details.status === "pending" && (
                  <div className="mt-5 grid grid-cols-2 w-1/2 gap-5 pb-20">
                    <button
                      onClick={() => handleUpdate("rejected")}
                      className="hover:bg-red-50 duration-300 transition-all ease-in-out hover:cursor-pointer w-full border-red-500 border text-red-500 py-3 rounded-md"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleUpdate("accepted")}
                      className="hover:bg-green-600 duration-300 transition-all ease-in-out hover:cursor-pointer w-full bg-green-500 text-white rounded-md"
                    >
                      Accept
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    );
}


export default LeaveCardsContainer


function PhoneLeaveCard({id,type,from,createdAt,to,days,status,name,batch,title,reason,setShowLeaveDetails}){
  return(
    <div onClick={()=>setShowLeaveDetails({show:true,details:{id,type,name,from,to,batch,reason,days,createdAt,status}})} className="bg-(--card) relative p-3 flex items-center gap-5 border  border-gray-200 rounded-md shadow-(--shadow-sm)">
      <div className="rounded-full p-5 border border-gray-200 shadow-(--shadow-sm)">
        <CiUser />
      </div>
      <div className="text-[0.60rem]">
        <p className="text-sm font-semibold">{type}</p>
        <p className="text-gray-500 font-semibold">{format(from,"dd MMM")} - {format(to,"dd MMM yyy")}</p>
        <p className="text-gray-500 font-semibold pr-4">{days} days - {reason}</p>
      </div>
      {/* <p className="absolute right-5 top-2 text-[0.60rem] p-1 px-2 text-white bg-green-500/70 rounded-md">Accepted</p> */}
      <p className="absolute right-3 top-[55%] text-sm -translate-y-1/2"><IoIosArrowForward /></p>
    </div>
  )
}