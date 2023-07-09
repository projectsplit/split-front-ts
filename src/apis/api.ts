import axios, { AxiosError } from 'axios'
import { authApi } from './authApi'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { getAccessToken, setAccessToken } from '../util/accessToken'
import { GetExpenseResponse, GetGroupExpensesResponse, GetGroupResponse } from '../types'
import { signOut } from '../util/signOut'

const apiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}`
})

const isAccessTokenDecodableAndNotExpired = (accessToken: string | null | undefined): boolean => {
  if (accessToken) {
    try {
      const decodedToken = jwt_decode<JwtPayload>(accessToken)
      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000)
        if (decodedToken.exp > currentTime) {
          return true
        }
      }
    }
    catch (e) {
      return false
    }
  }
  return false
}

// apiHttpClient.interceptors.request.use(async (request: any) => {
//   const accessToken = getAccessToken()
//   if (isAccessTokenDecodableAndNotExpired(accessToken)) {
//     request.headers.Authorization = `Bearer ${accessToken}`
//     return request
//   }
//   try {
//     const { accessToken } = await authApi.refreshAccessToken()
//     setAccessToken(accessToken)
//     request.headers.Authorization = `Bearer ${accessToken}`
//     return request
//   }
//   catch (e) {
//     signOut()
//   }
// },
//   (error: AxiosError) => Promise.reject(error)
// )

const getGroupById = async (groupId: string) => {
  const response = await apiHttpClient.get<GetGroupResponse>(`/group/get`, { params: { id: groupId } })
  return response.data
}

const getGroupExpenses = async (groupId: string) => {
  const response = await apiHttpClient.get<GetGroupExpensesResponse>(`/group/expenses`, { params: { groupId } })
  return response.data
}

const getExpense = async (expenseId: string) => {
  const response = await apiHttpClient.get<GetExpenseResponse>(`/expense/${expenseId}`,)
  return response.data
}

export const api = {
  getGroupById,
  getGroupExpenses,
  getExpense
}
