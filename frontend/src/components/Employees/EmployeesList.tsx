import { MouseEvent, useEffect, useState } from "react"
import { EmployeeType, fetchEmployee, fetchEmployees } from "../../services/api"
import { formatDate } from "../../utils/handleDates"
import { Pagination } from "./Pagination"

const selectedStyle = "text-gray-400 bg-gray-800 hover:bg-gray-800"
const notSelectedStyle = "bg-white hover:bg-neutral-200"
export function EmployeesList() {
  const [employees, setEmployees] = useState<EmployeeType[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState(0)
  const [pagesAmount, setPagesAmount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  async function handleClickRow(event: MouseEvent<HTMLElement>) {
    const { employee } = event.currentTarget.dataset

    if (employee === undefined) return

    const fetchedEmployee = await fetchEmployee(employee)

    const id: number = parseInt(employee)
    setSelectedEmployee(id)

    console.log(fetchedEmployee)
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
    <div className="w-full flex-col items-center justify-center py-4">
      <table className="w-3xl text-sm text-left text-neutral-800 mx-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">Nome</th>
            <th className="px-6 py-3">Cargo</th>
            <th className="px-6 py-3">Data de contratação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" data-table-users="list">
          {employees.map(({ id, name, role, hiring_date }) => (
            <tr
              key={`employee-${id}`}
              className={`border-b transition-all cursor-pointer ${
                selectedEmployee === id ? selectedStyle : notSelectedStyle
              }`}
              data-employee={id}
              onClick={handleClickRow}
            >
              <td className="px-6 py-4">{name}</td>
              <td className="px-6 py-4">{role}</td>
              <td className="px-6 py-4">{formatDate(hiring_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesAmount={pagesAmount}
      ></Pagination>
    </div>
  )
}
