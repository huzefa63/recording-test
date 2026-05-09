"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpInput from "react-otp-input";

function AuthForm() {
  const [isOtp, setIsOtp] = useState(false);
  const [email, setEmail] = useState("");
  async function getOtp(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/email/sendSigninEmail`,
        { email },
      );
      console.log(res);
      if (res.data?.ok) setIsOtp(true);
    } catch (err) {
      console.log(err);
    }
    // setIsOtp({otp:'123456'});
  }
  if (!isOtp)
    return (
      <form className="flex flex-col gap-4" onSubmit={getOtp}>
        <h1 className="mb-6 text-center text-2xl font-semibold text-amber-800">
          Sign In
        </h1>
        <div>
          <label className=" mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={(el) => setEmail(el.target.value)}
            type="email"
            placeholder="Enter your email"
            className=" bg-(--background) shadow-sm focus:outline-none focus:border-amber-500 transition-all duration-500 ease-in-out border border-amber-300 rounded-sm px-2 py-2 w-full placeholder:text-amber-900 placeholder:text-xs"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-5 bg-amber-800 hover:cursor-pointer hover:bg-amber-900 transition-all duration-300 ease-in-out shadow-sm text-white px-2 py-3 rounded-md text-xs tracking-wide "
        >
          Continue
        </button>
      </form>
    );
  if (isOtp) return <OTP email={email} />;
}

export default AuthForm;

function OTP({ email }) {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  async function verifyOtp() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/verifyOtp`,
        { otp, email },
        { withCredentials: true },
      );
      if (res.data?.jwt) {
        localStorage.setItem("jwt", res.data.jwt);
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err.response);
    }
  }
  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-8 ">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Verify Email
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              className="
                min-w-[15%] h-14
                border border-gray-300
                rounded-xl
                text-center text-lg font-semibold
                transition
                focus:outline-none
                focus:border-black
                focus:ring-2 focus:ring-black/20
              "
            />
          )}
          containerStyle="gap-2"
        />

        <button
          onClick={verifyOtp}
          className="
            mt-6 w-full
            bg-amber-800 text-white
            py-2.5 rounded-xl
            font-medium
            transition hover:bg-gray-800
          "
        >
          Verify
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span className="underline cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
}
