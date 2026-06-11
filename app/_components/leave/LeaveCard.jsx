import { CiCalendarDate } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

function LeaveCard() {
    return (
      <div className="border border-l-4 border-l-amber-800 border-(--border) flex items-center gap-5 relative bg-(--card) p-3 rounded-md shadow-(--shadow-sm)">
        <div className="text-[0.60rem] absolute right-2 top-2 p-2 bg-orange-500/15 font-bold rounded-full px-3 text-orange-700">
          Upcoming
        </div>
        <div className="h-20 flex justify-center items-center w-20 rounded-full border border-(--border)">
          <FaUser className="text-5xl" />
        </div>

        <div className="text-xs text-gray-600 flex flex-col gap-1 w-[58%]">
          <h1 className="text-lg font-semibold text-black truncate">
            huzefa ratlam
          </h1>
          <h1>batch: yaqoot</h1>
          <h1>fever</h1>
          <h1 className="text-amber-800 font-bold flex items-center gap-1 text-[0.60rem]">
            <CiCalendarDate className="text-xs" />{" "}
            <span className="">20 may 2025 - 23 may 2025</span>
          </h1>
        </div>
      </div>
    );
}

export default LeaveCard
