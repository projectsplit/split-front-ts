import axios from 'axios'
import {
  RefreshAccessTokenResponse,
  RequestSignInRequest,
  RequestSignInResponse,
  VerifyEmailLinkTokenRequest,
  VerifyEmailLinkTokenResponse,
  ContinueSignInReponse,
  RequestSignUpRequest,
  RequestSignUpResponse
} from '../types'

const authApiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}/auth`,
  withCredentials: true
})

const continueSignIn = async (): Promise<ContinueSignInReponse> => {
  const response = await authApiHttpClient.post<ContinueSignInReponse>(
    `/sign-in`
  )
  return response.data
}

const requestSignIn = async (request: RequestSignInRequest): Promise<RequestSignInResponse> => {
  const response = await authApiHttpClient.post<RequestSignInResponse>(
    `/request-sign-in`,
    request
  )
  return response.data
}

const requestSignUp = async (request: RequestSignUpRequest): Promise<RequestSignUpResponse> => {

  const response = await authApiHttpClient.post<RequestSignUpResponse>(
    `/request-sign-up`,
    request
  )
  return response.data
}

const verifyEmailLinkToken = async (request: VerifyEmailLinkTokenRequest): Promise<VerifyEmailLinkTokenResponse> => {

  const response = await authApiHttpClient.post<VerifyEmailLinkTokenResponse>(
    `/verify-token`,
    request
  )
  return response.data
}

const refreshAccessToken = async (): Promise<RefreshAccessTokenResponse> => {
  const response = await authApiHttpClient.post<RefreshAccessTokenResponse>(
    `/refresh-token`
  )
  return response.data
}


export const authApi = {
  requestSignIn,
  requestSignUp,
  refreshAccessToken,
  verifyEmailLinkToken,
  continueSignIn
}
