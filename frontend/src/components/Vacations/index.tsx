import { useEmployee } from "../../hooks/useEmployee"
import { DateRangeVacationsContainer } from "./DateRangeVacationsContainer"

export function Vacations() {
  const { selectedEmployee } = useEmployee()

  if (selectedEmployee.id) {
    return <DateRangeVacationsContainer />
  } else {
    return (
      <h3 className="text-neutral-700 text-center my-12">
        Selecione o funcionário na tabela acima
      </h3>
    )
  }
}
