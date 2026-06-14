import Link from "next/link";
import EntryButtons from "../../_components/EntryButtons"
import { FaArrowLeftLong } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import ProtectRoutes from "../../_components/auth/ProtectRoutes";
import { auth } from "@/auth";
import StartRecording from "@/app/_components/entry/StartRecording";
import RecordingWrapper from "@/app/_components/entry/RecordingWrapper";
import { IoMdArrowRoundBack } from "react-icons/io";

async function Page({params,searchParams}) {
  const searchParam = await params;
  const queryParams = await searchParams;
    return (
      <ProtectRoutes>
        <div className="h-full w-full p-4 pt-2  ">
          <RecordingWrapper
            studentName={queryParams.studentName}
            studentId={searchParam.studentId}
          />
        </div>
      </ProtectRoutes>
    );
}

export default Page
