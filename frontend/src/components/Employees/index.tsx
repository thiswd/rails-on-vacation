import { DateRange, Range } from "react-date-range"

import { EmployeesList } from "./EmployeesList"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { useState } from "react"
import { pt } from "date-fns/locale"

const minDate = new Date()
const dateFormat = "d MMMM yyyy"
const endDateText = "Data final"
const initialRange = {
  startDate: minDate,
  endDate: undefined,
  key: "selection",
}
export function Employees() {
  const [range, setRange] = useState<Range[]>([initialRange])

  return (
    <div className="w-[1024px] h-screen mx-auto flex flex-col items-center">
      <EmployeesList />
      <div className="w-full h-full flex vle items-center justify-center">
        <DateRange
          editableDateInputs={true}
          onChange={item => setRange([item.selection])}
          ranges={range}
          months={2}
          direction="horizontal"
          minDate={minDate}
          locale={pt}
          dateDisplayFormat={dateFormat}
          endDatePlaceholder={endDateText}
        />
      </div>
    </div>
  )
}
