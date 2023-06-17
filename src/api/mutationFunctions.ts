import axios from 'axios';

export const requestSignIn = async (email: string) => {

  return await axios.post(
    `${process.env.REACT_APP_APIURL}/auth/request-sign-in`,
    { email: email },
    { withCredentials: true }
  )
}