'use client';
import { useState } from "react";
import ScrollToTopButton from "../ScrollToTopButton";
import LeaveCardsContainer from "./LeaveCardsContainer";
import LeaveFilters from "./LeaveFilters";
import LeaveStatisticCards from "./LeaveStatisticCards";

function LeaveWrapper() {
    const [show,setShow] = useState(true);
    return (
      <div className={`flex flex-col gap-5 p- rounded-md ${show && 'p-3'}`}>
        {show && <LeaveStatisticCards />}

        {show && <LeaveFilters />}
        <LeaveCardsContainer setShow={setShow} show={show}/>
        {/* <ScrollToTopButton /> */}
      </div>
    );
}

export default LeaveWrapper
