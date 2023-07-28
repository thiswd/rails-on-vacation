import { Employees } from "./components/Employees"
import { Vacations } from "./components/Vacations"

function App() {
  return (
    <div>
      <div className="max-w-[1024px] h-screen mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Employees />
        <Vacations />
      </div>
    </div>
  )
}

export default App
