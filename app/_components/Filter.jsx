"use client";
import { IoFilter } from "react-icons/io5";
import Modal from "./Modal";
import CustomSelect from "./Select";
import { Suspense, useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import CustomDateRangePicker from "./CustomDateRangePicker";
import { CiCalendarDate, CiFilter } from "react-icons/ci";
import { useUser } from "./providers/UserProvider";
import CustomContextMenu from "./CustomContextMenu";
import { useAppProvider } from "./providers/AppProvider";

// const teachers = [
//   {
//     label: "janab mulla aliasgar bhai adil",
//     value: "janab mulla aliasgar bhai adil",
//   },
//   {
//     label: "huzefa ratlam",
//     value: "huzefa ratlam",
//   },
//   {
//     label: "fakhruddin charchoda",
//     value: "fakhruddin charchoda",
//   },
//   {
//     label: "abbas jiniya",
//     value: "abbas jiniya",
//   },
//   {
//     label: "murtaza dudhiya",
//     value: "murtaza dudhiya",
//   },
// ];

// const students = [
//   {
//     label: "all",
//     value: "all",
//   },
//   {
//     label: "aliasgar hasham",
//     value: "aliasgar hasham",
//   },
//   {
//     label: "taha chati",
//     value: "taha chati",
//   },
//   {
//     label: "hasan challa",
//     value: "hasan challa",
//   },
//   {
//     label: "burhanuddin soda",
//     value: "burhanuddin soda",
//   },
//   {
//     label: "yusuf naya",
//     value: "yusuf naya",
//   },
// ];

function Filter({role}) {
  const {teachers,students} = useAppProvider();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [filterType, setFilterType] = useState("");
  const {user} = useUser();
 
  const customizedTeachers = teachers?.map((el,i) => {
    if(i === 0) return {label:'all',value:''}
    else return { label: el.name, value: el.name };
  })
  const customizedStudents = students?.map((el,i) => {
    if (i === 0) return { label: "all", value: "" };
    else return { label: el.name, value: el.name };
  })
  if(user?.role === 'student' || user?.role === 'teacher') return null;
  return (
    <div className="relative  px-2 w-fit">
      <button
        className="flex font-semibold hover:cursor-pointer duration-300 ease-in-out transition-all hover:bg-(--primary) text-white text-sm items-center gap-3 px-4 py-3 bg-(--primary-light) rounded-md shadow-(--shadow-md)"
        onClick={() => setIsShowFilter(!isShowFilter)}
      >
        <CiFilter className="text-xl" /> Filter
      </button>
      {isShowFilter && (
        <CustomContextMenu
          onClose={() => setIsShowFilter(false)}
          className="pr-15"
          options={[
            {
              handler: () => {
                setFilterType("student");
                setIsShowFilter(false);
                setIsShowModal(true);
              },
              text: "Students",
              icon: <PiStudentBold className="text-amber-800" />,
            },
            {
              handler: () => {
                setFilterType("teacher");
                setIsShowFilter(false);
                setIsShowModal(true);
              },
              text: "Teacher",
              icon: <LiaChalkboardTeacherSolid className="text-amber-800" />,
            },
            {
              handler: () => {
                setFilterType("date");
                setIsShowFilter(false);
                setIsShowModal(true);
              },
              text: "Date",
              icon: <CiCalendarDate className="text-amber-800" />,
            },
          ]}
        />
      )}

      <Suspense>
        {isShowModal && (
          <Modal
            heading={
              (filterType === "student" && "select student") ||
              (filterType === "teacher" && "select teacher") ||
              (filterType === "date" && "select date")
            }
            onClose={() => setIsShowModal(false)}
            className={filterType === "date" && "h-fit w-fit"}
          >
            {filterType === "date" && <CustomDateRangePicker />}

            {filterType !== "date" && (
              <>
                <CustomSelect
                  options={filterType === "student" ? customizedStudents : customizedTeachers}
                  filterType={filterType}
                />
              </>
            )}
          </Modal>
        )}
      </Suspense>
    </div>
  );
}
export default Filter;

function FilterButton({ onClick, children }) {
  return (
    <button
      className="flex border-b border-b-(--border) items-center gap-3 w-full px-5 py-3 text-left text-sm hover:bg-(--card-hover) transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}