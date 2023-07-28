import { format, parseISO } from "date-fns"
import { pt } from "date-fns/locale"

const parsedDate = (date: Date | string) => {
  if (typeof date === "string") {
    return parseISO(date)
  }
  return date
}
export const formatDate = (date: Date | string) => {
  return format(parsedDate(date), "dd/MM/yyyy", { locale: pt })
}
