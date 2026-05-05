import { IoIosArrowDown } from "react-icons/io";
import RecordingEntry from "../_components/RecordingEntry";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

async function Page() {
    let data;
    
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/recording/get`,{method:'GET'});
        const resJson = await res.json();
        data = resJson.recordings;
        console.log(data);
    }catch(err){
        console.log(err);
    }
  return (
    <div className="w-full h-full flex items-center px-5 justify-center">
        <Link href="/students" className="absolute top-5 left-5 bg-amber-900 text-white px-4 py-1 rounded-md flex items-center gap-2 "><FaArrowLeftLong /> students</Link>
      <div className="rounded-md h-3/4 w-full bg-(--layer) p-5">
        <h1 className="text-2xl font-bold text-amber-900 text-center">
          Recordings
        </h1>

        <div className="w-full mt-5 shadow border border-(--border) rounded overflow-hidden">
          <div className="w-full grid grid-cols-11 bg-(--background) font-semibold text-center">
            <div className="p-2">no</div>
            <div className="p-2 col-span-3">Date</div>
            <div className="p-2 col-span-3">Student</div>
            <div className="p-2 col-span-3">Muhaffiz</div>
            {/* <div class="p-2">⬇</div> */}
          </div>

          {data.map((el,i) => <RecordingEntry key={el._id} el={el} i={i} />)}
        </div>
      </div>
    </div>
  );
}

export default Page;
