import axios from 'axios'
import { RefreshAccessTokenResponse, SignInWithEmailLinkRequest, SignInWithEmailLinkResponse, VerifyEmailLinkTokenRequest } from '../types'

const authApiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}/auth`,
  withCredentials: true
})

const signInWithEmailLink = async (request: SignInWithEmailLinkRequest): Promise<SignInWithEmailLinkResponse> => {
  const response = await authApiHttpClient.post<SignInWithEmailLinkResponse>(
    `/request-sign-in`,
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

const verifyEmailLinkToken = async (request: VerifyEmailLinkTokenRequest): Promise<void> => {
  await authApiHttpClient.post(`/verify-token/${request.token}`)
}

export const authApi = {
  signInWithEmailLink,
  refreshAccessToken,
  verifyEmailLinkToken
}
