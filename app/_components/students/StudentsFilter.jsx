import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5"

function StudentsFilter({ handleFilterStudents }) {
  return (
    <div className="w-full lg:w-1/2 lg:mx-auto flex gap-5">
      <div className="flex-1 h-full relative">
        <input
        onChange={(e) => handleFilterStudents(e.target.value)}
          type="text"
          placeholder="search students..."
          className="bg-(--card) placeholder:text-sm text-sm shadow focus:outline-none px-10 rounded-full py-3 w-full border border-(--border)"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <CiSearch className="" />
        </div>
      </div>
      <button className="bg-(--card) p-3 px-4 shadow rounded-full">
        <IoFilterOutline />
      </button>
    </div>
  );
}

export default StudentsFilter;
