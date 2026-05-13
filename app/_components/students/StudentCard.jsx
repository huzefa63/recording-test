'use client';
import Image from "next/image";
import Link from "next/link";
import { Item, Separator, useContextMenu } from "react-contexify";
import { BiDotsVertical } from "react-icons/bi";
import { FaEdit, FaMicrophone, FaUserCircle } from "react-icons/fa";
import ContextMenu from "../ContextMenu";
import { CiMicrophoneOn } from "react-icons/ci";
import { useState } from "react";
import Modal from "../Modal";
import CustomSelect from "../Select";
import { changeDiary } from "@/actions/student";
import { MdDelete } from "react-icons/md";

function StudentCard({ image, name, studentId, teachers }) {
  const { show } = useContextMenu({
    id: "student",
  });
  const [showModal,setShowModal] = useState(false);

  function showContextMenu(e) {
    show({ event: e, props: { studentId } });
  }

  async function handleChangeDiary(teacherId){
    const formData = new FormData();
    formData.append('teacherId',teacherId);
    formData.append('studentId',studentId);
    await changeDiary(formData)
  }
  const customizedTeachers = teachers.map(el => ({label:el.name,value:el._id}))
  return (
    <div className="flex justify-center">
      <div className="relative rounded-md w-3/4 border-t-4 border-amber-900 bg-(--layer)">
        <button
          onClick={showContextMenu}
          className="menu-btn absolute right-2 top-2 w-8 flex justify-center py-1"
        >
          <BiDotsVertical className=" text-lg" />
        </button>
        <div
          // href={`/entry/${studentId}`}
          className=" flex flex-col items-center  w-full p-4 rounded-md shadow border border-x-(--border) border-b-(--border) gap-2"
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
          <Link
            href={`/entry/${studentId}`}
            className="border rounded-full shadow-md p-2 bg-amber-800 text-white"
          >
            <FaMicrophone />
          </Link>
        </div>
      </div>
      {showModal && (
        <Modal onClose={()=>setShowModal(false)} className="h-fit" heading="select teacher">
          <h1 className="ml-1 mt-10 mb-2 tracking-wider font-bold text-amber-800 text-sm">
            Student: {name}
          </h1>
          <CustomSelect
            options={customizedTeachers}
            isButton={true}
            handler={handleChangeDiary}
          />
        </Modal>
      )}
      <ContextMenu>
        <Item onClick={()=>setShowModal(true)}>
          <FaEdit className="mr-2" /> change diary
        </Item>
        <Separator />
        <Item onClick={() => console.log("Delete")}>
          <MdDelete className="mr-2" /> delete student
        </Item>
      </ContextMenu>
    </div>
  );
}

export default StudentCard
