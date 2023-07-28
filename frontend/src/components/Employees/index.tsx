import { useEmployee } from "../../hooks/useEmployee"
import { formatDate } from "../../utils/handleDates"
import { EmployeesList } from "./EmployeesList"

export function Employees() {
  const { selectedEmployee } = useEmployee()

  return (
    <div className="mb-6">
      <EmployeesList />
      {selectedEmployee.id && (
        <>
          <h2 className="text-center mt-4 text-2xl">{selectedEmployee.name}</h2>
          <p className="text-center">
            Contratação: {formatDate(selectedEmployee.hiring_date)}
          </p>
          <ul>
            {selectedEmployee.vacations.map(({ id, start_date, end_date }) => (
              <li
                key={`vacation-${id}`}
                className="flex items-center justify-center"
              >
                <h4>Ferias de {start_date.getFullYear()}</h4>
                <p>Data inicial: {formatDate(start_date)}</p>
                <p>Data final: {formatDate(end_date)}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
