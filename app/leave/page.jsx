import { CiCalendarDate, CiCircleCheck, CiFilter, CiUser } from "react-icons/ci"
import { FaGraduationCap, FaUser } from "react-icons/fa"
import { GoClock } from "react-icons/go"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { IoCalendarOutline } from "react-icons/io5"

function Page() {
    return (
        <div className="w-full h-full p-5 flex flex-col gap-5">
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-10 gap-y-4">
                <div className="p-5 bg-(--card) shadow-(--shadow-md) h- rounded-md flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center">
                        <IoCalendarOutline className="text-2xl text-(--primary)"/>
                        <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">10</p>
                    </div>
                    <p className="text-sm text-(--primary) font-semibold">Upcoming</p>
                </div>

                <div className="p-5 bg-(--card) shadow-(--shadow-md) h- rounded-md flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center">
                        <CiCircleCheck className="text-3xl text-green-500"/>
                        <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">10</p>
                    </div>
                    <p className="text-sm text-(--primary) font-semibold">Accepted</p>
                </div>

                <div className="p-5 bg-(--card) shadow-(--shadow-md) h- rounded-md flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center">
                        <IoIosCloseCircleOutline className="text-3xl text-red-500"/>
                        <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">10</p>
                    </div>
                    <p className="text-sm text-(--primary) font-semibold">Upcoming</p>
                </div>

                <div className="p-5 bg-(--card) shadow-(--shadow-md) h- rounded-md flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center">
                        <GoClock className="text-2xl text-(--primary)"/>
                        <p className="p-2 text-xs rounded-full bg-gray-100 shadow-(--shadow-md) border border-(--border)">10</p>
                    </div>
                    <p className="text-sm text-(--primary) font-semibold">Remaining</p>
                </div>
                
            </div>

            <div className="grid grid-cols-2 gap-5">
                <button className="flex items-center gap-2 justify-center bg-(--bg-tertiary)/50 py-3 rounded-md shadow-(--shadow-sm)"><FaGraduationCap className="text-2xl"/> <span className="text-xs">Students</span></button>
                <button className="flex items-center gap-2 justify-center bg-(--card) py-3 rounded-md shadow-(--shadow-sm)"><CiUser className="text-2xl"/> <span className="text-xs">Teacher</span></button>
            </div>

            <div className="flex items-center gap-4">
                <input type="text" className="focus:outline-0 px-5 rounded-md flex-1 bg-(--card) border border-(--border) shadow-(--shadow-sm) h-12"/>
                <button className=" bg-(--card) h-12 px-4 shadow-(--shadow-sm) rounded-md flex items-center gap-2">
                    <CiFilter className="text-xl"/>
                    <span className="text-sm">Filter</span>
                </button>
            </div>

            <div>
                <div className="flex items-center gap-5 relative bg-(--card) p-3 rounded-md shadow-(--shadow-sm)">
                    <div className="text-[0.60rem] absolute right-2 top-2 p-2 bg-orange-500/20 rounded-full px-3 text-orange-700">Upcoming</div>
                    <div className="h-20 flex justify-center items-center w-20 rounded-full border border-(--border)">
                        <FaUser className="text-5xl"/>
                    </div>

                    <div className="text-xs text-gray-600 flex flex-col gap-1 w-[58%]">
                        <h1 className="text-lg font-semibold text-black truncate">huzefa ratlam</h1>
                        <h1>batch: yaqoot</h1>
                        <h1>fever</h1>
                        <h1 className="flex items-center gap-1 text-[0.60rem]"><CiCalendarDate className="text-xs"/> <span>20 may 2025 - 23 may 2025</span></h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page
