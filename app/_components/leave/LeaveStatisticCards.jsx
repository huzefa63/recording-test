"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiCalendar, CiCircleCheck } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { IoIosCloseCircleOutline, IoIosStats } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineNotes } from "react-icons/md";
function LeaveStatisticCards() {
  const searchParams = useSearchParams();
  const { data } = useQuery({
    queryKey: ["leaveStatistics", searchParams.get("user")],
    queryFn: handleGetLeaveStatistics,
  });

  async function handleGetLeaveStatistics() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/leave/getStatistics?user=${searchParams.get("user")}`,
        { withCredentials: true },
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  const status = searchParams.get("status");
  const router = useRouter();
  const pathname = usePathname();
  function handleChangeSearchParams(type, value) {
    const params = new URLSearchParams(searchParams);
    params.set(type, value);
    router.replace(`${pathname}?${params}`);
  }
  return (
    <div className="bg-(--card) border border-gray-200 rounded-xl py-5 px-2">
      <h1 className="font-bold pl-3 mb-2 text-xl flex items-center gap-2 border-b border-gray-200 pb-2">
        <p className="p-2 rounded-md bg-gray-100">
          <IoIosStats />
        </p>{" "}
        Your Leaves Data
      </h1>
      <div className=" grid grid-cols-2 ">
        <div className=" border-r border-b border-gray-200 flex items-center gap-5 p-6 ">
          <p className="p-2 bg-orange-500/7 rounded-md h-fit">
            <MdOutlineNotes className="text-lg text-amber-600" />
          </p>

          <div>
            <p className="text-xs text-gray-500">Total Leaves</p>
            <h3 className="font-semibold text-sm capitalize">{}0</h3>
          </div>
        </div>

        <div className=" border-b border-gray-200 flex items-center gap-5 p-6 ">
          <p className="p-2 bg-green-500/10 rounded-md h-fit">
            <GoClock className="text-lg text-green-600" />
          </p>

          <div>
            <p className="text-xs text-gray-500">Pending</p>
            <h3 className="font-semibold text-sm">{data?.pending}</h3>
          </div>
        </div>

        <div className=" border-r border-gray-200 flex items-center gap-5 p-6 ">
          <p className="p-2 bg-blue-500/10 rounded-md h-fit">
            <CiCalendar className="text-lg text-blue-600" />
          </p>

          <div>
            <p className="text-xs text-gray-500">Accepted</p>
            <h3 className="font-semibold text-sm">{data?.accepted}</h3>
          </div>
        </div>

        <div className="  border-gray-200 flex items-center gap-5 p-6 ">
          <p className="p-2 bg-indigo-500/10 rounded-md h-fit">
            <CiCalendar className="text-lg text-indigo-600" />
          </p>

          <div>
            <p className="text-xs text-gray-500">Rejected</p>
            <h3 className="font-semibold text-sm">{data?.rejected}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveStatisticCards;
