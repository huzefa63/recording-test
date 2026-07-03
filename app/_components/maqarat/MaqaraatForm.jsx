'use client'
import Modal from "../Modal";
import Select from 'react-select';
import { useAppProvider } from "../providers/AppProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../providers/UserProvider";
function MaqaraatForm() {
const {user} = useUser();
  const [isForm,setIsForm] = useState(false);

  if(!user?.role || user?.role !== 'admin') return null;
    if(user?.role === 'admin')return (
      <div className="flex justify-end">
        <button onClick={()=>setIsForm(true)} className="bg-(image:--gradient-primary) hover:scale-103 hover:cursor-pointer duration-300 ease-in-out transition-all text-white p-3 rounded-md shadow-(--shadow-lg) text-xs">
          + Create Maqarat Session
        </button>
        {isForm && <Form onClose={() => setIsForm(false)}/>}
      </div>
    );
}

export default MaqaraatForm

const maqaratJuz = [
  { label: "juz 30 (1st nisf)", value: "30 1" },
  { label: "juz 30 (2st nisf)", value: "30 2" },
  { label: "juz 29 (1st nisf)", value: "29 1" },
  { label: "juz 29 (2st nisf)", value: "29 2" },
  { label: "juz 28 (1st nisf)", value: "28 1" },
  { label: "juz 28 (2st nisf)", value: "28 2" },
  { label: "juz 27 (1st nisf)", value: "27 1" },
  { label: "juz 27 (2st nisf)", value: "27 2" },
  { label: "juz 26 (1st nisf)", value: "26 1" },
  { label: "juz 26 (2st nisf)", value: "26 2" },
  { label: "juz 1", value: "1" },
  { label: "juz 2", value: "2" },
  { label: "juz 3", value: "3" },
  { label: "juz 4", value: "4" },
  { label: "juz 5", value: "5" },
  { label: "juz 6", value: "6" },
  { label: "juz 7", value: "7" },
  { label: "juz 8", value: "8" },
  { label: "juz 9", value: "9" },
  { label: "juz 10", value: "10" },
  { label: "juz 11", value: "11" },
  { label: "juz 12", value: "12" },
  { label: "juz 13", value: "13" },
  { label: "juz 14", value: "14" },
  { label: "juz 15", value: "15" },
  { label: "juz 16", value: "16" },
  { label: "juz 17", value: "17" },
  { label: "juz 18", value: "18" },
  { label: "juz 19", value: "19" },
  { label: "juz 20", value: "20" },
  { label: "juz 21", value: "21" },
  { label: "juz 22", value: "22" },
  { label: "juz 23", value: "23" },
  { label: "juz 24", value: "24" },
  { label: "juz 25", value: "25" },
];

function Form({onClose}){
  const {teachers,students:allStudents} = useAppProvider();
  const [juz,setJuz] = useState({juz:29,nisf:1});
  const [batch,setBatch] = useState('baneen');
  const {data:studentsData} = useQuery({
    queryKey:['maqaratStudents',juz,batch],
    queryFn:handleGetMaqaratStudents,
  })
  const queryClient = useQueryClient();

  const [teacher,setTeacher] = useState('');
  const [students,setStudents] = useState([]);
  const [date,setDate] = useState('');
  const teacherOptions = teachers?.map(el => {
    return { label: el.name, value: el._id };
  })
  const studentOptions = studentsData?.map(el => {
    return { label: el.name, value: el._id };
  })

  async function handleGetMaqaratStudents(){
    try{
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL}/student/getMaqaratStudents?juz=${juz.juz}&nisf=${juz.nisf}&batch=${batch}`,{withCredentials:true})
      console.log(data);
      return data.students;
    }catch(err){
      console.log(err);
      return [];
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    const today = new Date();
    // if(new Date(date).getDate() < today.getDate()) return toast.error('you cannot set past dates');
    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/maqarat/create`,{
        teacher,students,juz,date,batch
      },{withCredentials:true});
      if(res.data.ok) {
        toast.success('session created');
        queryClient.invalidateQueries({queryKey:['maqarat']})
        onClose();
      }
    }catch(err){
      console.log(err);
      toast.error('failed to create session');
  }
  }
    return (
      <Modal
        onClose={onClose}
        className="h-fit w-[95%] lg:min-w-[40%] overflow-y-auto"
      >
        <div className="">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create Maqaarat
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Student */}
            <div>
              <label className="block text-sm font-medium mb-2">Teacher</label>
              <Select
                required
                isClearable
                options={teacherOptions}
                onChange={(el) => setTeacher(el.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Batch</label>
              <Select
                required
                isClearable
                onChange={(el) => setBatch(el.value)}
                options={[
                  { label: "Baneen", value: "baneen" },
                  { label: "Banaat", value: "banaat" },
                ]}
              />
            </div>

            {/* Juz */}
            <div>
              <label className="block text-sm font-medium mb-2">Students</label>
              <Select
                required
                options={studentOptions}
                onChange={(val) =>
                  setStudents((el) => val.map((el) => el.value))
                }
                isMulti
              />
            </div>

            {/* Surah */}
            <div>
              <label className="block text-sm font-medium mb-2">Juz</label>
              <Select
                required
                options={maqaratJuz}
                onChange={(el) => {
                  const juz = el.value.split(' ')[0];
                  let nisf;
                  if(Number(juz) >=1 && Number(juz) <= 25)nisf='';
                  else nisf = el.value.split(" ")[1]; 
                  setJuz({juz,nisf});
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                value={date}
                onChange={(el) => setDate(el.target.value)}
                type="date"
                className="border border-gray-300 bg-white/90  w-full py-2 px-2"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => onClose()}
                type="button"
                className="hover:bg-(--card-hover)  transition-all hover:cursor-pointer duration-300 ease-in-out flex-1 border border-(--border) shadow rounded-xl py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                className=" flex-1 bg-(--primary) hover:bg-amber-800 transition-all hover:cursor-pointer duration-300 ease-in-out text-white/90 text-sm rounded-xl py-2"
              >
                Create Session
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
}
