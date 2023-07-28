import { Employees } from "./components/Employees"
import { Vacations } from "./components/Vacations"
import { EmployeeProvider } from "./contexts/EmployeeProvider"

function App() {
  return (
    <EmployeeProvider>
      <div className="max-w-[48rem] w-full min-h-screen mx-auto flex flex-col items-center">
        <h1 className="text-3xl mt-8 mb-4">Agendamento de férias</h1>
        <Employees />
        <Vacations />
      </div>
    </EmployeeProvider>
  )
}

export default App
