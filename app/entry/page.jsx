import Link from "next/link";
import EntryButtons from "../_components/EntryButtons"
import { FaArrowLeftLong } from "react-icons/fa6";

function Page() {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Link
          href="/students"
          className="absolute top-5 left-5 bg-amber-900 text-white px-4 py-1 rounded-md flex items-center gap-2 "
        >
          <FaArrowLeftLong /> students
        </Link>

        <EntryButtons />
      </div>
    );
}

export default Page
