import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { authApi } from './authApi'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { getAccessToken, setAccessToken } from '../util/accessToken'
import { GetGroupResponse } from '../types'
import { signOut } from '../util/signOut'

const apiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}`
})

let isRefreshing = false;
let requestQueue: Array<(accessToken: string) => void> = [];

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

apiHttpClient.interceptors.request.use(async (request: any) => {
  
  const accessToken = getAccessToken()

  if (isAccessTokenDecodableAndNotExpired(accessToken)) {
    request.headers.Authorization = `Bearer ${accessToken}`
    return request
  }

  if (isRefreshing) {
    return queueRequest(request)
  }

  return refreshAccessToken(request)
},
  (error: AxiosError) => Promise.reject(error)
)


// A function to queue the requests
function queueRequest(request: AxiosRequestConfig) {
  
  return new Promise((resolve, reject) => {
    requestQueue.push((accessToken: string) => {
      request.headers = request.headers || {}
      request.headers.Authorization = `Bearer ${accessToken}`
      resolve(request)
    })
  })
}

// A function to refresh the access token
async function refreshAccessToken(request: AxiosRequestConfig) {
  
  isRefreshing = true

  try {
    const { accessToken: newAccessToken } = await authApi.refreshAccessToken()
    setAccessToken(newAccessToken)
    isRefreshing = false
    processQueue(newAccessToken)
    request.headers = request.headers || {}
    request.headers.Authorization = `Bearer ${newAccessToken}`
    return request
  } catch (e) {
    signOut()
  }
}

// A function to process the queued requests
function processQueue(newAccessToken: string) {
  while (requestQueue.length) {
    const process = requestQueue.shift() as (accessToken: string) => void
    process(newAccessToken)
  }
}

const getGroupById = async (groupId: string) => {
  const response = await apiHttpClient.get<GetGroupResponse>(`/group/get`, { params: { id: groupId } });
  return response.data;
}

export const api = {
  getGroupById
}
