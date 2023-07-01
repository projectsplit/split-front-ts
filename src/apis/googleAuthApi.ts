import axios from 'axios'
import { ContinueSignInReponse, ContinueWithGoogleRequest } from '../types'

const authApiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}/auth`,
  withCredentials: true
})

const getGoogleRedirectUrl = async (): Promise<string> => {
  const response = await authApiHttpClient.get<string>(
    `/google/url`
  )
  return response.data;
}

const continueWithGoolge = async (request: ContinueWithGoogleRequest): Promise<ContinueSignInReponse> => {
  const response = await authApiHttpClient.post<ContinueSignInReponse>(
    `/google/callback`,
    request
  )
  return response.data;
}

export const googleAuthApi = {
  getGoogleRedirectUrl,
  continueWithGoolge
}
