import LeaveStatisticCards from "../_components/leave/LeaveStatisticCards"
import LeaveFilters from "../_components/leave/LeaveFilters"
import LeaveCardsContainer from "../_components/leave/LeaveCardsContainer"
import CreateLeave from "../_components/leave/CreateLeave"
import ScrollToTopButton from "../_components/ScrollToTopButton"


function Page() {
    return (
        <div className="h-full p-5 flex flex-col gap-5">
            <LeaveStatisticCards />

            <LeaveFilters />
            <LeaveCardsContainer />
            <ScrollToTopButton />
        </div>
    )
}

export default Page
