import { Employees } from "./components/Employees"
import { Vacations } from "./components/Vacations"
import { EmployeeProvider } from "./contexts/EmployeeProvider"

function App() {
  return (
    <EmployeeProvider>
      <div className="max-w-[1024px] h-screen mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Employees />
        <Vacations />
      </div>
    </EmployeeProvider>
  )
}

export default App
