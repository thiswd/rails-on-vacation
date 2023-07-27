import { useEffect, useState } from "react"
import { fetchEmployees } from "../../services/api"

export function EmployeesList() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetchEmployees().then(data => setEmployees([...(data || [])]))
  }, [])

  return (
    <ul>
      {employees.map(({ id, name, role }) => (
        <li key={id}>
          {name} {role}
        </li>
      ))}
    </ul>
  )
}
