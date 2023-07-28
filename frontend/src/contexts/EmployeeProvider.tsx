import {
  createContext,
  useState,
  useEffect,
  MouseEvent,
  ReactNode,
} from "react"
import { EmployeeType, fetchEmployee, fetchEmployees } from "../services/api"

interface EmployeeContextProps {
  employees: EmployeeType[]
  selectedEmployee: EmployeeType
  pagesAmount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  handleClickRow: (event: MouseEvent<HTMLElement>) => Promise<void>
}

export const EmployeeContext = createContext<EmployeeContextProps>(
  {} as EmployeeContextProps,
)

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<EmployeeType[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType>(
    {} as EmployeeType,
  )
  const [pagesAmount, setPagesAmount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const handleClickRow = async (event: MouseEvent<HTMLElement>) => {
    const { employeeId } = event.currentTarget.dataset

    if (employeeId === undefined) return

    const fetchedEmployee = await fetchEmployee(employeeId)
    fetchedEmployee && setSelectedEmployee(fetchedEmployee)
  }

  useEffect(() => {
    fetchEmployees(currentPage).then(data => {
      const { employees } = data
      const totalPages = data.total_pages
      setEmployees([...employees])
      setPagesAmount(totalPages)
    })
  }, [currentPage])

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selectedEmployee,
        pagesAmount,
        currentPage,
        setCurrentPage,
        handleClickRow,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}
