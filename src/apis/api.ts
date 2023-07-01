import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { authApi } from './authApi'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { getAccessToken, setAccessToken } from '../util/accessToken'
import { GetGroupRequest, GetGroupResponse } from '../types'

const apiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}`
})

let isRefreshing = false
let requestQueue: Function[] = []

apiHttpClient.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {
  console.info("START")
  const delayPromise: Promise<InternalAxiosRequestConfig<any>> = new Promise((resolve) => {
    setTimeout(() => {
      console.info("FINISH")
      resolve(config)
    }, 5000)
  })
  console.info("BEFORE RETURN")
  return delayPromise
}, (error) => {
  return Promise.reject(error)
})

// apiHttpClient.interceptors.request.use(async (request: any) => {

//   // if (isRefreshing) {
//   //   return new Promise((resolve) => {
//   //     requestQueue.push((accessToken: string) => {
//   //       request.headers.Authorization = `Bearer ${accessToken}`
//   //       resolve(apiHttpClient(request))
//   //     })
//   //   })
//   // }

//   const accessToken = getAccessToken()

//   if (isAccessTokenValid(accessToken)) {
//     request.headers.Authorization = `Bearer ${accessToken}`
//   }
//   else {
//     const newAccessToken = await authApi.refreshAccessToken()
//     setAccessToken(newAccessToken.accessToken)
//     request.headers.Authorization = `Bearer ${newAccessToken.accessToken}`
//   }

//   return request

// },
//   (error: AxiosError) => Promise.reject(error)
// )

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

const getGroupById = async (request: GetGroupRequest) => {
  const response = await apiHttpClient.post<GetGroupResponse>(`/group/get`, request)
  return response.data
}

export const api = {
  getGroupById
}
