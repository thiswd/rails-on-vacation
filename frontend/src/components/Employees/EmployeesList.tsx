import { useEmployee } from "../../hooks/useEmployee"
import { formatDate } from "../../utils/handleDates"
import { Pagination } from "./Pagination"

const selectedStyle = "text-gray-400 bg-gray-800 hover:bg-gray-800"
const notSelectedStyle = "bg-white hover:bg-neutral-200"
export function EmployeesList() {
  const { employees, handleClickRow, selectedEmployee } = useEmployee()

  return (
    <div className="w-full flex-col items-center justify-center py-4">
      <table className="w-full text-sm text-left text-neutral-800 mx-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">Nome</th>
            <th className="px-6 py-3">Cargo</th>
            <th className="px-6 py-3 text-center">Data de contratação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" data-table-users="list">
          {employees.map(({ id, name, role, hiring_date }) => (
            <tr
              key={`employee-${id}`}
              className={`border-b transition-all cursor-pointer ${
                selectedEmployee.id === id ? selectedStyle : notSelectedStyle
              }`}
              data-employee-id={id}
              onClick={handleClickRow}
            >
              <td className="px-6 py-4">{name}</td>
              <td className="px-6 py-4">{role}</td>
              <td className="px-6 py-4 text-center">
                {formatDate(hiring_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  )
}
