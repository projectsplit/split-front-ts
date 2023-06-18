import axios, { AxiosError } from 'axios'
import { authApi } from './authApi'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { getAccessToken, setAccessToken } from '../util/accessToken'
import { GetGroupRequest, GetGroupResponse } from '../types'

const apiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}`
})

const isAccessTokenValid = (accessToken: string | null | undefined): boolean => {
  if (accessToken) {
    const decodedToken = jwt_decode<JwtPayload>(accessToken)
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedToken.exp > currentTime) {
        return true
      }
    }
  }
  return false
}

apiHttpClient.interceptors.request.use(async (request: any) => {
  const accessToken = getAccessToken()
  if (isAccessTokenValid(accessToken)) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  else {
    const newAccessToken = await authApi.refreshAccessToken()
    setAccessToken(newAccessToken.accessToken)
    request.headers.Authorization = `Bearer ${newAccessToken.accessToken}`
  }
  return request
},
  (error: AxiosError) => Promise.reject(error)
)

const getGroupById = async (request: GetGroupRequest) => {
  const response = await apiHttpClient.post<GetGroupResponse>(`/group/get`, request);
  return response.data;
}

export const api = {
  getGroupById
}
