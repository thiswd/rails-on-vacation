import { MouseEvent, useEffect, useState } from "react"
import { fetchEmployees } from "../../services/api"
import { formatDate } from "../../utils/handleDates"

const selectedStyle = "text-gray-400 bg-gray-800 hover:bg-gray-800"
const notSelectedStyle = "bg-white hover:bg-neutral-200"
export function EmployeesList() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(0)

  function handleClickRow(event: MouseEvent<HTMLElement>) {
    const { employee } = event.currentTarget.dataset

    if (employee === undefined) return

    const id: number = parseInt(employee)
    setSelectedEmployee(id)
  }

  useEffect(() => {
    fetchEmployees().then(data => setEmployees([...(data || [])]))
  }, [])

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
      <nav className="w-full flex items-center justify-center">
        <ul className="mx-auto inline-flex -space-x-px text-sm h-8">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300"
              id="prev"
            >
              Previous
            </button>
          </li>
          {/* <% (1..pages_amount).each do |n| %> */}
          {/* <button className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300" data-page-number="<%= n %>"><%= n %></button> */}
          {/* <% end %> */}
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300"
              id="next"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
