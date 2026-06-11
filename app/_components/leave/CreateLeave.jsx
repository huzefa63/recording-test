'use client';
import { useState } from "react";
import Modal from "../Modal"
import { CiCalendar } from "react-icons/ci";
import { GrNotes } from "react-icons/gr";
import { LuSend } from "react-icons/lu";
import { LiaStickyNoteSolid } from "react-icons/lia";

function CreateLeave() {
    const [showForm,setShowForm] = useState(false);
    return (
        <div className="ml-auto">
            <button onClick={()=>setShowForm(!showForm)} className="bg-(image:--gradient-primary) text-white/90 px-4 h-10 rounded-md">+ New Leave</button>
            {showForm && <LeaveForm onClose={()=>setShowForm(false)}/>}
        </div>
    )
}

export default CreateLeave

function LeaveForm({onClose}){
    return (
      <Modal onClose={onClose} className="h-[90%] w-[90%]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="p-4 rounded-md bg-(--bg-tertiary)/50 shadow-(--shadow-sm)">
              <CiCalendar />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Create Leave</h1>
              <h1 className="text-[0.60rem] text-gray-800">
                Fill in the details below to submit a leave request
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">Leave Topic</p>
            <div className="relative">
              <input type="text" name="" id="" className="p-2 pl-15 rounded-md focus:outline-none w-full border border-(--border)"/>
              <div className="p-2 absolute top-1/2 -translate-y-1/2 left-1 rounded-md bg-(--bg-tertiary)/50 shadow-(--shadow-sm)">
                <LiaStickyNoteSolid />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">Reason</p>
            <div className="relative">
              <textarea type="text" name="" id="" rows={3} className="p-2 pl-15 rounded-md focus:outline-none w-full border border-(--border)"/>
              <div className="p-2 absolute top-2  left-2 rounded-md bg-(--bg-tertiary)/50 shadow-(--shadow-sm)">
                <LiaStickyNoteSolid />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">Start Date</p>
            <div className="relative">
              <input type="date" name="" id="" className="p-2 pl-15 rounded-md focus:outline-none w-full border border-(--border)"/>
              <div className="p-2 absolute top-1/2 -translate-y-1/2  left-1 rounded-md bg-(--bg-tertiary)/50 shadow-(--shadow-sm)">
                <CiCalendar />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">End Date</p>
            <div className="relative">
              <input type="date" name="" id="" className="p-2 pl-15 rounded-md focus:outline-none w-full border border-(--border)"/>
              <div className="p-2 absolute top-1/2 -translate-y-1/2  left-1 rounded-md bg-(--bg-tertiary)/50 shadow-(--shadow-sm)">
                <CiCalendar />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">No of days</p>
            <div className="relative">
              <input type="Number" name="" id="" className="p-2 pl-15 rounded-md focus:outline-none w-full border border-(--border)"/>
              <div className="p-2 absolute top-1/2 -translate-y-1/2  left-1 rounded-md bg-(--bg-tertiary)/50 shadow-(--shadow-sm)">
                <CiCalendar />
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 text-white bg-(image:--gradient-primary) py-3 justify-center rounded-md shadow-(--shadow-md)"><LuSend /> Submit Leave Request</button>
        </div>
      </Modal>
    );
}