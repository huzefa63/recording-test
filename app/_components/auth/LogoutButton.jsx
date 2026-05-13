import { handleLogout } from "@/actions/auth";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  return (
    <form action={handleLogout}>
      <button className="w-full flex gap-2 items-center justify-center bg-[#5c4320] text-white py-3 rounded-xl font-semibold hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition shadow-md mt-2">
        <FaSignOutAlt size={18} />
        Logout
      </button>
    </form>
  );
}
