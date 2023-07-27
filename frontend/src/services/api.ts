import axios, { AxiosError } from "axios"

const API_URL_DEFAULT = "http://localhost:3000/api/v1/employees"
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || API_URL_DEFAULT

export type EmployeeType = {
  id: number
  name: string
  position: string
  hiring_date: Date
}

const apiClient = axios.create({ baseURL: API_URL })

export async function fetchEmployees(): Promise<[] | undefined> {
  try {
    const response = await apiClient.get(API_URL)
    const employees = response.data

    return employees
  } catch (err: unknown) {
    const error = err as AxiosError
    const { request, response } = error

    if (response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data, status, headers } = response
      console.log({ data, status, headers })
    } else if (request) {
      // The request was made but no response was received
      console.log(request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message)
    }
    throw error
  }
}
