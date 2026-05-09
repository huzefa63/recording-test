"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
function CustomDateRangePicker() {
  const [range, setRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "range1" },
  ]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
   function handleChangeDateSelection(el){
    setRange([{startDate:el.range1.startDate,endDate:el.range1.endDate}]);
    const params = new URLSearchParams(searchParams);
    params.set('startDate',el.range1.startDate.toLocaleDateString('en-CA'));
    params.set('endDate',el.range1.endDate.toLocaleDateString('en-CA'));
    router.replace(`${pathname}?${params}`);
   }
  return (
    <DateRangePicker
      className="w-3/4"
      editableDateInputs
      startDatePlaceholder="start date"
      endDatePlaceholder="end date"
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      inputRanges={[]}
      staticRanges={[]}
      months={1}
      ranges={range}
      onChange={handleChangeDateSelection}
      
    />
  );
}

export default CustomDateRangePicker;
