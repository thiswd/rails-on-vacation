import axios, { AxiosError } from "axios"

const API_URL_DEFAULT = "http://localhost:3000/api/v1/employees"
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || API_URL_DEFAULT

export type EmployeeType = {
  id: number
  name: string
  role: string
  hiring_date: Date
}

interface EmployeesResponse {
  current_page: number
  total_pages: number
  employees: EmployeeType[]
}

const apiClient = axios.create({ baseURL: API_URL })

const perPageDefault = 6
export async function fetchEmployees(
  page: number,
  per_page: number = perPageDefault,
): Promise<EmployeesResponse> {
  try {
    const response = await apiClient.get("/", {
      params: {
        page: page,
        per_page: per_page,
      },
    })
    const employees: EmployeesResponse = response.data
    return employees
  } catch (err: unknown) {
    handleAxiosError(err)
  }
}

export async function fetchEmployee(id: string): Promise<[] | undefined> {
  try {
    const response = await apiClient.get(id)
    const employee = response.data

    return employee
  } catch (err: unknown) {
    handleAxiosError(err)
  }
}

function handleAxiosError(err: unknown): never {
  const error = err as AxiosError
  if (error.response) {
    // The request was made and the server responded with a status code out of the range of 2xx
    const { data, status, headers } = error.response
    console.log({ data, status, headers })

    throw error.response
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request)

    throw new Error("No response received from the server.")
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message)

    throw error
  }
}
