import LogoutButton from "../_components/auth/LogoutButton";
import ProtectRoutes from "../_components/auth/ProtectRoutes";
import UploadImage from "../_components/profile/UploadImage";
import UpdatePassword from "../_components/profile/UpdatePassword";

async function Page() {

  return (
      <div className="h-full bg-(--background) flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-(--layer) rounded-4xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-black/5">
          <div>
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
                  // defaultValue={session.user.email}
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
                  name="name"
                  type="text"
                  // defaultValue={session.user.name}
                  readOnly
                  disabled
                  placeholder="Enter your name"
                  className="bg-white/70 border border-[#d8c08e] text-[#4d3718] rounded-xl px-4 py-3 outline-none focus:border-[#8b6a36] focus:bg-white transition placeholder:text-[#9a8259]"
                />
              </div>
              <UpdatePassword />
            </div>
          </div>
          <div className="mt-4 w-full">
            <LogoutButton />
          </div>
        </div>
      </div>
  );
}

export default Page;
