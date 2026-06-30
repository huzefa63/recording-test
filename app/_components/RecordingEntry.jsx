'use client';
import { format } from "date-fns";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function RecordingEntry({el,i,isDummy=false}) {
    const [isExpand,setIsExpand] = useState(false);
    if(!isDummy)return (
      <div className="w-full hover:bg-(--card-hover) duration-300 ease-in-out transition-all hover:cursor-pointer" onClick={() => setIsExpand(!isExpand)}>
        <div className="w-full grid grid-cols-9 px-3 py-3 border-b border-(--border)">
          {/* <p>{(page - 1) * 10 + index + 1}</p> */}
          <div className="flex gap-2 items-center text-[0.55rem] tracking-wider col-span-3">
            <span className="p-2 rounded-md bg-orange-100">
              <CiCalendar className="text-orange-600" />
            </span>{" "}
            <div className="flex flex-col">
              <span className="truncate">
                {format(el.createdAt, "d MMM, yyyy")}
              </span>
              <span>{format(el.createdAt, "hh:mm aa")}</span>
            </div>
          </div>
          <p className=" text-[0.60rem] lg:text-sm">
            {Math.round(el?.duration) || ""} min
          </p>
          <p className=" col-span-2 text-[0.60rem] lg:text-sm text-left truncate">
            {el.studentName}
          </p>
          <p className=" col-span-2 text-[0.60rem] lg:text-sm text-left truncate">
            {el.teacherName}
          </p>
          <button
            // onClick={() => setIsExpand(!isExpand)}
            className="text-xs flex justify-center"
          >
            <IoIosArrowDown
              className={`${isExpand && "rotate-180"} duration-300 ease-in-out`}
            />
          </button>
        </div>
        {isExpand && (
          <div className=" w-full flex justify-center py-2">
            <div className="w-3/4 rounded-md overflow-hidden shadow-(--shadow-lg)">
              <AudioPlayer
                autoPlay={false}
                customAdditionalControls={[]}
                src={el.audio}
                // onPlay={() => console.log("Playing")}
                className="text-sm"
              />
            </div>
          </div>
        )}
      </div>
    );
    if(isDummy)return (
      <div className="w-full">
        <div className="w-full grid grid-cols-11 px-3 py-2 border-(--border)">
          {/* <p>{(page - 1) * 10 + index + 1}</p> */}
          <p className=" text-xs opacity-0">1</p>
          <p className="text-xs tracking-wider col-span-3">
            
          </p>
          <p className=" col-span-3 text-xs text-left"></p>
          <p className=" col-span-3 text-xs text-left"></p>
          <button
            // onClick={() => setIsExpand(!isExpand)}
            className="text-xs flex justify-center"
          >
            
          </button>
        </div>
      </div>
    );
}

export default RecordingEntry
{/* <div className="w-full grid grid-cols-11 text-center border-t-amber-800 border-t">
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
            <IoIosArrowDown
              className={`${isExpand && "rotate-180"} duration-300 ease-in-out`}
            />
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
        )} */}