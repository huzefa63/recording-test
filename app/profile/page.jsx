import LogoutButton from "../_components/auth/LogoutButton";
import ProtectRoutes from "../_components/auth/ProtectRoutes";
import UploadImage from "../_components/profile/UploadImage";

function Page() {
  return (
    <ProtectRoutes>
      <div className="min-h-screen bg-(--background) flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-(--layer) rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-black/5">
          <h1 className="text-3xl font-bold text-[#5c4320] mb-8 text-center">
            Profile
          </h1>

          <div className="flex flex-col gap-5">
            {/* Profile Image */}
            <UploadImage />

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[#6f542d] font-medium">Email</label>

              <input
                type="email"
                readOnly
                disabled
                placeholder="Enter your email"
                className="bg-white/70 border border-[#d8c08e] text-[#4d3718] rounded-xl px-4 py-3 outline-none focus:border-[#8b6a36] focus:bg-white transition placeholder:text-[#9a8259]"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[#6f542d] font-medium">Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                className="bg-white/70 border border-[#d8c08e] text-[#4d3718] rounded-xl px-4 py-3 outline-none focus:border-[#8b6a36] focus:bg-white transition placeholder:text-[#9a8259]"
              />
            </div>


            {/* Save Button */}
            <button className="bg-[#5c4320] text-white py-3 rounded-xl font-semibold hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition shadow-md mt-2">
              Save Changes
            </button>

            {/* Logout */}
            <div className="mt-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </ProtectRoutes>
  );
}

export default Page;
