import { Range } from "react-date-range"

import { format, isWithinInterval, parseISO } from "date-fns"
import { pt } from "date-fns/locale"
import { VacationType } from "../services/api"

type DateType = Date | string

export const parsedDate = (date: DateType) => {
  if (typeof date === "string") {
    return parseISO(date)
  }
  return date
}
export const formatDate = (date: DateType) => {
  return format(parsedDate(date), "dd/MM/yyyy", { locale: pt })
}

export const dateIsWithinInterval = (
  vacation: VacationType,
  newRange: Range,
) => {
  const { start_date, end_date } = vacation
  const { startDate, endDate } = newRange
  const interval = { start: parsedDate(start_date), end: parsedDate(end_date) }

  if (startDate && endDate) {
    return (
      isWithinInterval(parsedDate(startDate), interval) ||
      isWithinInterval(parsedDate(endDate), interval)
    )
  }
}
