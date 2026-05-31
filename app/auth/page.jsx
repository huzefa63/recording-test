// app/auth/page.jsx
import { Cinzel } from "next/font/google";
import GoogleButton from "../_components/auth/GoogleButton";
import AuthForm from "../_components/auth/AuthForm";
const font = Cinzel({
    subsets:['latin'],
    weight:['500','600','700']
})
export default function Page() {
  return (
    <div className="flex h-full items-center justify-center px-4 bg-[url('/auth-bg.png')] bg-cover" >
      <div className=" backdrop-blur-sm w-full max-w-md rounded-3xl border border-(--border) p-8 shadow-(--shadow-lg)">
        <div className="mb-8 text-center">
          <h1 className={` ${font.className} text-3xl font-bold tracking-tight text-[#2b1d14]`}>
            Tahfeez Dohad
          </h1>

          <p className="mt-2 text-sm text-[#6b4d36]">
            Sign in to continue
          </p>
        </div>
          <AuthForm />
        {/* <div className="space-y-4">
          <GoogleButton role="student" />
          <GoogleButton role="teacher" />
          <GoogleButton role="admin" />
        </div> */}
      </div>
    </div>
  );
}
