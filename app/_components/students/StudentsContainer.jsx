'use client';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StudentCard from "./StudentCard";
import axios from "axios";
import ContextMenu from "../ContextMenu";
import { Item, Separator, useContextMenu } from "react-contexify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomSelect from "../Select";
import Modal from "../Modal";
import { useAppProvider } from "../providers/AppProvider";
import { useState } from "react";
import toast from "react-hot-toast";

function StudentsContainer({ session }) {
    const {teachers} = useAppProvider();
    const queryClient = useQueryClient();
      const { show } = useContextMenu({
        id: "student",
      });
      const [showModal,setShowModal] = useState(false);
      const [selectedStudent,setSelectedStudent] = useState({name:'',id:''});
      
      function showContextMenu(e) {
        const target = e.target.closest('.menu-btn')
        if(!target) return;
        const {studentid,studentname} = target.dataset
        setSelectedStudent({name:studentname,id:studentid});
        show({ event: e});
      }
    
      async function handleChangeDiary(teacherId){
        try{
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_URL}/student/changeDiary?studentId=${selectedStudent.id}&teacherId=${teacherId}`,{},{headers:{Authorization:`Bearer ${session.jwt}`}});
            if(res.data.ok) {
                queryClient.invalidateQueries(['myStudents'])
                setShowModal(false);
                return toast.success("student diary updated");
            }
        }catch(err){
            console.log(err);
            toast.error('failed to change student diary')
        }
      }
      const { data:students } = useQuery({
          queryKey: ["myStudents"],
    queryFn:handleGetMyStudents,
    refetchOnWindowFocus:false,
});

async function handleGetMyStudents() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/student/getStudents`, {
        headers: { Authorization: `Bearer ${session?.jwt}` },
      });
      console.log(res.data.students)
      return res.data.students;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const customizedTeachers = teachers?.map(el => ({label:el.name,value:el._id}))
  return (
    <div onClick={showContextMenu} className="grid grid-cols-2 gap-y-6">
      {students?.length > 0 &&
        students.map((el) => (
          <StudentCard
            key={el._id}
            image={el?.profileImage}
            name={el.name}
            studentId={el._id}
          />
        ))}
      {students?.length < 1 && (
        <h1 className="absolute top-1/2 left-1/2 -translate-1/2 font-bold text-xl tracking-wider text-center w-3/4">
          you don&apos;t have any students tagged yet!
        </h1>
      )}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="h-fit"
          heading="select teacher"
        >
          <h1 className="ml-1 mt-10 mb-2 tracking-wider font-bold text-amber-800 text-sm">
            Student: {selectedStudent.name}
          </h1>
          <CustomSelect
            options={customizedTeachers}
            isButton={true}
            handler={handleChangeDiary}
          />
        </Modal>
      )}
      <ContextMenu>
        {session.currentUser.role === 'admin' && <Item onClick={() => setShowModal(true)}>
          <FaEdit className="mr-2" /> change diary
        </Item>}
        {session.currentUser.role === 'teacher' && <Item onClick={() => setShowModal(true)}>
          <FaEdit className="mr-2" /> assign proxy
        </Item>}
        {session.currentUser.role === 'admin' && <Separator />}
        {session.currentUser.role === 'admin' && <Item onClick={() => console.log("Delete")}>
          <MdDelete className="mr-2" /> delete student
        </Item>}
      </ContextMenu>
    </div>
  );
}

export default StudentsContainer;
