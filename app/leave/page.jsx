import LeaveStatisticCards from "../_components/leave/LeaveStatisticCards"
import LeaveFilters from "../_components/leave/LeaveFilters"
import LeaveCardsContainer from "../_components/leave/LeaveCardsContainer"
import CreateLeave from "../_components/leave/CreateLeave"


function Page() {
    return (
        <div className="h-full p-5 flex flex-col gap-5">
            <LeaveStatisticCards />

            <LeaveFilters />
            <LeaveCardsContainer />

        </div>
    )
}

export default Page
