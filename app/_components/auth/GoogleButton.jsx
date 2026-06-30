// _components/auth/GoogleButton.jsx
import { handleSignIn } from "@/actions/auth";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({ role }) {
  return (
    <form action={handleSignIn}>
      <input type="hidden" name="role" value={role} />

      <button className="flex hover:cursor-pointer w-full items-center justify-center gap-3 rounded-2xl border border-(--border) bg-(image:--gradient-light) px-5 py-3 text-sm font-semibold shadow-(--shadow-lg) transition-all duration-200 hover:scale-105 ">
        <div className="rounded-full bg-white p-1 shadow-sm">
          <FcGoogle className="text-xl" />
        </div>

        <span className="tracking-wide">Continue with google</span>
      </button>
    </form>
  );
}
