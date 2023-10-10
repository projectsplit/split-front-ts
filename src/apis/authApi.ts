import axios, { AxiosResponse } from 'axios'
import {
  RefreshAccessTokenResponse,
  ContinueReponse,
  EmailInitiateRequest,
  EmailVerifyLinkResponse,
  GoogleContinueRequest
} from '../types'

const authApiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}/auth`,
  withCredentials: true
})

const refreshAccessToken = async (): Promise<RefreshAccessTokenResponse> => {
  const response = await authApiHttpClient.post<RefreshAccessTokenResponse>(
    `/refresh-token`
  )
  return response.data
}

const emailSendLink = async (request: EmailInitiateRequest): Promise<AxiosResponse<any>> => {
  console.log("Enered")
  const response = await authApiHttpClient.post(
    `email/send-link`,
    request
  )
 
  return response.data
}

const emailVerifyLinkToken = async (token: string): Promise<EmailVerifyLinkResponse> => {
  const response = await authApiHttpClient.get<EmailVerifyLinkResponse>(
    `email/verify-link-token`,
    { params: { token } }
  )
  return response.data
}

const emailContinue = async (): Promise<ContinueReponse> => {
  const response = await authApiHttpClient.get<ContinueReponse>(
    `email/connect`
  )
  return response.data
}

const getGoogleUrl = async (): Promise<string> => {
  const response = await authApiHttpClient.get<string>(
    `/google/url`
  )
  return response.data;
}

const googleConnect = async (request: GoogleContinueRequest): Promise<ContinueReponse> => {
  const response = await authApiHttpClient.post<ContinueReponse>(
    `/google/connect`,
    request
  )
  return response.data;
}

export const authApi = {
  refreshAccessToken,
  emailSendLink,
  emailVerifyLinkToken,
  emailContinue,
  getGoogleUrl,
  googleConnect
}
