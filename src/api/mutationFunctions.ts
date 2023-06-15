import axios from 'axios';


export const requestSignIn = async (email: string) => {

  try {
    await axios.post(
      `${process.env.REACT_APP_APIURL}/auth/request-sign-in`,
      { email: email },
      { withCredentials: true }
    )
  } catch (error: any) {
    return error
  }
}