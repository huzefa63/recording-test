import { handleLogout } from "@/actions/auth";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  return (
    <form action={handleLogout}>
      <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#c9ae79] bg-[#f8e6bc] px-4 py-3 font-semibold text-[#5c4320] shadow-sm transition-all duration-200 hover:bg-[#f3ddb0] active:scale-[0.98]">
        <FaSignOutAlt size={18} />
        Logout
      </button>
    </form>
  );
}
