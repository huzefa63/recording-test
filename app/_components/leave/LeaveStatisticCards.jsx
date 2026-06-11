'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
function LeaveStatisticCards() {
  const searchParams = useSearchParams();
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
        className={`border-3   ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "upcoming" ? " bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : 'border-transparent'}`}
      >
        <div className="w-full flex justify-between items-center">
          <IoCalendarOutline className="text-2xl text-(--primary)" />
          <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            10
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Upcoming</p>
      </button>

      <button
        onClick={() => handleChangeSearchParams("status", "accepted")}
        className={`border-3  ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "accepted" ? "bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : 'border-transparent'}`}
      >
        <div className="w-full flex justify-between items-center">
          <CiCircleCheck className="text-3xl text-green-500" />
          <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            10
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Accepted</p>
      </button>

      <button
        onClick={() => handleChangeSearchParams("status", "rejected")}
        className={`border-3  ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "rejected" ? "bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : 'border-transparent'}`}
      >
        <div className="w-full flex justify-between items-center">
          <IoIosCloseCircleOutline className="text-3xl text-red-500" />
          <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            10
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Rejected</p>
      </button>

      <button
        onClick={() => handleChangeSearchParams("status", "pending")}
        className={`border-3 ease-in-out duration-300 transition-all p-5 bg-(--card) text-left shadow-(--shadow-sm) h- rounded-md flex flex-col gap-2 ${status === "pending" ? "bg-(--card-highlight) border-3 border-(--border) shadow-(--shadow-sm)" : 'border-transparent'}`}
      >
        <div className="w-full flex justify-between items-center">
          <GoClock className="text-2xl text-(--primary)" />
          <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">
            10
          </p>
        </div>
        <p className="text-sm text-(--primary) font-semibold">Pending</p>
      </button>
    </div>
  );
}

export default LeaveStatisticCards;
