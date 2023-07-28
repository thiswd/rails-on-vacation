import { DateRange, Range, RangeKeyDict } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { FormEvent, useState } from "react"
import { pt } from "date-fns/locale"
import { differenceInDays, differenceInMonths, subDays } from "date-fns"
import { useEmployee } from "../../hooks/useEmployee"
import { VacationType, createVacation } from "../../services/api"
import { Spinner } from "../shared/Spinner"

const minDate = new Date()
const yesterday = subDays(minDate, 1) // Start with invalid date
const dateFormat = "d MMMM yyyy"
const startDateText = "Data inicial"
const endDateText = "Data final"
const yearInMonths = 12
const minDaysDuration = 10
const initialRange = {
  startDate: yesterday,
  endDate: yesterday,
  key: "selection",
}

export function DateRangeVacationsContainer() {
  const [range, setRange] = useState<Range[]>([initialRange])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const { selectedEmployee } = useEmployee()

  function handleDateChange(rangesByKey: RangeKeyDict) {
    const newRange = rangesByKey.selection
    setRange([newRange])

    const { startDate, endDate } = newRange
    if (!startDate || !endDate) return

    const { hiring_date } = selectedEmployee

    const afterHiring =
      differenceInMonths(startDate, hiring_date) >= yearInMonths

    if (!afterHiring) {
      const message =
        "Funcionário só poderá tirar férias um ano depois de sua contratação"
      setError(message)
    }

    const acceptableDuration =
      differenceInDays(endDate, startDate) >= minDaysDuration

    if (!acceptableDuration) {
      const message = "Período de férias não pode ser menor do que 10 dias."
      setError(message)
    }

    if (afterHiring && acceptableDuration) {
      setError("")
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (range.length === 0) return

    setLoading(true)

    const vacation_data = {
      employee_id: selectedEmployee.id,
      start_date: range[0].startDate,
      end_date: range[0].endDate,
    } as VacationType

    try {
      await createVacation(vacation_data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full h-full mb-12">
      {error && <p className="text-center">{error}</p>}
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="hidden" name="employeeId" value={selectedEmployee.id} />

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

          <button
            type="submit"
            className="flex items-center justify-center px-10 py-2 -mt-2 text-lg font-light rounded-md bg-neutral-900 text-stone-100 hover:brightness-125 self-end"
          >
            Agendar
          </button>
        </form>
      )}
    </div>
  )
}
