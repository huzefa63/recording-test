import { FaUserFriends } from "react-icons/fa"
import MaqaraatForm from "./MaqaraatForm";

function MaqaratHeader() {
    return (
      <div className="flex flex-col gap-4">
        {/* <div className="flex items-center gap-4">
          <div className="p-2 rounded-md bg-(--bg-tertiary)/50 w-fit">
            <FaUserFriends />
          </div>
          <div>
            <h1 className="font-bold">Maqarat Sessions</h1>
            <p className="text-xs text-gray-500">Create & Manage Maqarat Sessions</p>
          </div>
        </div> */}
        <MaqaraatForm />
      </div>
    );
}

export default MaqaratHeader
