'use client';
import Image from "next/image";
import Link from "next/link";
import { useContextMenu } from "react-contexify";
import { BiDotsVertical } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import ContextMenu from "../ContextMenu";

function StudentCard({image,name,studentId}) {
  const { show } = useContextMenu({
    id: "student",
  });

  function showContextMenu(e){
    const rect = e.target.closest("button").getBoundingClientRect();
    show({event:e,props:{studentId},position:{y:rect.y + rect.height + 8,x: rect.x}})
  }
    return (
      <div className="flex justify-center">
        <div className="relative w-3/4 border-t-4 border-amber-900 bg-(--layer)">
          <button onClick={showContextMenu} className="menu-btn absolute right-2 top-2 w-8 flex justify-center py-1">
            <BiDotsVertical className=" text-lg" />
          </button>
          <Link
            href={`/entry/${studentId}`}
            className=" flex flex-col items-center  w-full p-5 rounded-md shadow border border-x-(--border) border-b-(--border) gap-3"
          >
            {image && (
              <div className="relative h-18 w-18 rounded-full overflow-hidden">
                <Image src={image} alt="user photo" fill />
              </div>
            )}
            {!image && <FaUserCircle className="text-5xl text-amber-950" />}
            <p className="font-semibold text-stone-800 tracking-wider text-sm text-center">
              {name}
            </p>
          </Link>
        </div>
        <ContextMenu />
      </div>
    );
}

export default StudentCard
