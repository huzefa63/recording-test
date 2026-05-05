'use client';
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function RecordingEntry({el,i}) {
    const [isExpand,setIsExpand] = useState(false);
    return (
      <div className="w-full">
        <div className="w-full grid grid-cols-11 text-center border-t-amber-800 border-t">
          <div className="p-2 text-xs">{i + 1}</div>
          <div className="p-2 text-xs col-span-3">
            {new Date(el.createdAt).getDate()}-
            {new Date(el.createdAt).getMonth() + 1}-
            {new Date(el.createdAt).getFullYear()}
          </div>
          <div className="p-2 text-xs col-span-3">{el.student}</div>
          <div className="p-2 text-xs col-span-3">{el.muhaffiz}</div>
          <button
            onClick={() => setIsExpand(!isExpand)}
            className="p-2 text-xs flex justify-center"
          >
            <IoIosArrowDown className={`${isExpand && 'rotate-180'} duration-300 ease-in-out`}/>
          </button>
        </div>
        {isExpand && (
          <div className=" w-full">
            <audio
              src={el.audio}
              className=" scale-70 w-full rounded-lg p-2 bg-blue-50"
              controls
            ></audio>
          </div>
        )}
      </div>
    );
}

export default RecordingEntry
