import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5"

function StudentsFilter({ handleFilterStudents }) {
  return (
    <div className="w-full flex gap-5">
      <div className="flex-1 h-full relative">
        <input
        onChange={(e) => handleFilterStudents(e.target.value)}
          type="text"
          placeholder="search students..."
          className="bg-(--card) placeholder:text-sm text-sm shadow focus:outline-none px-10 rounded-md py-2 w-full border border-(--border)"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <CiSearch className="" />
        </div>
      </div>
      <button className="bg-(--card) p-2 px-3 shadow rounded-md">
        <IoFilterOutline />
      </button>
    </div>
  );
}

export default StudentsFilter;
