import { DateRange, Range, RangeKeyDict } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { useState } from "react"
import { pt } from "date-fns/locale"
import { differenceInDays, differenceInMonths } from "date-fns"
import { useEmployee } from "../../hooks/useEmployee"

const minDate = new Date()
const dateFormat = "d MMMM yyyy"
const startDateText = "Data inicial"
const endDateText = "Data final"
const yearInMonths = 12
const minDaysDuration = 10
const initialRange = {
  startDate: minDate,
  endDate: minDate,
  key: "selection",
}
export function DateRangeVacationsContainer() {
  const [range, setRange] = useState<Range[]>([initialRange])

  const { selectedEmployee } = useEmployee()
  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    const newRange = rangesByKey.selection
    setRange([newRange])

    const { startDate, endDate } = newRange
    if (!startDate || !endDate) return

    const { hiring_date } = selectedEmployee

    const afterHiring =
      differenceInMonths(startDate, hiring_date) >= yearInMonths

    const acceptableDuration =
      differenceInDays(endDate, startDate) >= minDaysDuration

    console.log({ afterHiring, acceptableDuration })

    if (afterHiring && acceptableDuration) {
      console.log(newRange)
    }
  }

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleDateChange}
      ranges={range}
      months={2}
      direction="horizontal"
      minDate={minDate}
      locale={pt}
      dateDisplayFormat={dateFormat}
      startDatePlaceholder={startDateText}
      endDatePlaceholder={endDateText}
    />
  )
}
