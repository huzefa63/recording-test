import Link from "next/link"
import { FaUser } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6";

function Page() {
    return (
      <div className="flex items-center justify-center h-full">
        <Link
          href="/recordings"
          className="absolute top-5 left-5 bg-amber-900 text-white px-4 py-1 rounded-md flex items-center gap-2 "
        >
          <FaArrowLeftLong /> recordings
        </Link>

        <Link
          href="/entry"
          className="flex flex-col items-center bg-(--layer) p-10 rounded-md shadow gap-2"
        >
          <FaUser />
          <p>Aziz naya</p>
        </Link>
      </div>
    );
}

export default Page
