import { DateRange, Range } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
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
export function DateRangeVacations() {
  const [range, setRange] = useState<Range[]>([initialRange])

  return (
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
  )
}
