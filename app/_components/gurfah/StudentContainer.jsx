'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import StudentsFilter from "../students/StudentsFilter";
import { FaUser } from "react-icons/fa";
import { RiArrowDropRightLine } from "react-icons/ri";
import Link from "next/link";

function StudentContainer({session}) {
    const [filteredStudents,setFilteredStudents] = useState([]);
          const { data: students } = useQuery({
            queryKey: ["myStudents"],
            queryFn: handleGetMyStudents,
            refetchOnWindowFocus: false,
          });

          async function handleGetMyStudents() {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_URL}/student/getStudents`,
                {
                  headers: { Authorization: `Bearer ${session?.jwt}` },
                },
              );
              setFilteredStudents(res.data.students);
              return res.data.students;
            } catch (err) {
              console.log(err);
              return [];
            }
          }

          function handleFilterStudents(value) {
            if (value.length < 3) return setFilteredStudents(students);
            setFilteredStudents(students);
            setFilteredStudents((student) =>
              student.filter((el) => el.name.includes(value)),
            );
          }
    return (
      <div className="h-full flex flex-col">
        <StudentsFilter handleFilterStudents={handleFilterStudents} />
        <div className="bg-(--card) flex-1 mt-5 rounded-lg shadow-(--shadow-lg)">
          {filteredStudents?.length > 0 &&
            filteredStudents.map((el) => (
             <StudentCard key={el._id} name={el.name} id={el._id}/>
            ))}
          {students?.length < 1 && (
            <h1 className="absolute top-1/2 left-1/2 -translate-1/2 font-bold text-xl tracking-wider text-center w-3/4">
              you don&apos;t have any students tagged yet!
            </h1>
          )}
        </div>
      </div>
    );
}
export default StudentContainer

function StudentCard({name,id}){
    return (
      <Link href={`/student_gurfah/${id}`} className="flex items-center justify-between p-5 border-b border-(--border) duration-300 ease-in-out transition-all hover:cursor-pointer hover:bg-(--card-hover)">
        <div className="flex items-center gap-6">
          <div className="p-3 rounded-full bg-(--bg-tertiary)/50">
            <FaUser className="text-xl" />
          </div>
          <div className="font-bold text-(--text) tracking-wider">{name}</div>
        </div>
        <div><RiArrowDropRightLine className="text-2xl" /></div>
      </Link>
    );
}