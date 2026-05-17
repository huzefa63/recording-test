import Image from "next/image";
import Link from "next/link"
import { FaBook, FaUser, FaUserCircle } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6";
import ProtectRoutes from "../_components/auth/ProtectRoutes";
import { auth } from "@/auth";
import StudentCard from "../_components/students/StudentCard";
import StudentsContainer from "../_components/students/StudentsContainer";

async function Page() {
 
    const session = await auth();
    
    return (
      <ProtectRoutes>
        <div className="h-full px-5">
          <div className="bg-(image:--gradient-primary) mt-2 rounded-xl p-5 flex items-center gap-5 w-full">
            <div className="p-3 text-white bg-(--primary-light) rounded-lg">
              <FaBook className="text-4xl " />
            </div>
            <div>
              <p className="text-white">{session?.user?.name}&apos;s diary</p>
              <p className="text-white/80 text-xs">record and manage students</p>
            </div>
          </div>
          {/* <hr className="mt-5 text-amber-400"/> */}
          <div className=" mt-10">
            <StudentsContainer session={session} />
          </div>
        </div>
      </ProtectRoutes>
    );
}

export default Page
