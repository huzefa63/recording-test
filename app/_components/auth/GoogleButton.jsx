import { handleSignIn } from "@/actions/auth";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <form action={handleSignIn}>
      <button className="shadow-lg flex items-center justify-center gap-3 w-full max-w-sm rounded-2xl bg-amber-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98]">
        <div className="rounded-full bg-white p-1">
          <FcGoogle className="text-xl" />
        </div>

        <span>Continue with Google</span>
      </button>
    </form>
  );
}