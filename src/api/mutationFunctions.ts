import axios from 'axios';

export const requestSignIn = async (email: string) => {

  const response = await axios.post(
    `${process.env.REACT_APP_APIURL}/auth/request-sign-in`,
    { email: email },
    { withCredentials: true }
  )
  return response
}