import { CiViewList } from "react-icons/ci";
import MaqaraatForm from "../_components/maqarat/MaqaraatForm";
import MaqaratContainer from "../_components/maqarat/MaqaratContainer"
import MaqaratFilter from "../_components/maqarat/MaqaratFilter";
import MaqaratHeader from "../_components/maqarat/MaqaratHeader"

async function Page({searchParams}) {
    // const query = await searchParams;
    // console.log(query)
    return (
      <div className="p-3 ">
        <MaqaratHeader />
        {/* {/* <MaqaraatForm /> */}
        <div className="flex justify-between mt-5 items-center">
          <div className="flex justify-between w-full pb-3">
            <h1 className="font-bold flex items-center gap-2 text-lg">
              <p className="p-2 rounded-md bg-(--bg-tertiary)/50 text-amber-900 border border-(--border) shadow-(--shadow-sm)">
                <CiViewList className="text-xl " />
              </p>{" "}
              Past Maqarat Sessions
            </h1>
            <MaqaratFilter />
          </div>
        </div>
        <MaqaratContainer />
      </div>
    );
}

export default Page
