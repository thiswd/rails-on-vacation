import { useContext } from "react"
import { EmployeeContext } from "../contexts/EmployeeProvider"

export function useEmployee() {
  const context = useContext(EmployeeContext)

  if (context === undefined) {
    throw new Error("useEmployee must be used within a EmployeeProvider")
  }

  return context
}
