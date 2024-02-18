import { setAccessToken } from "./accessToken"

export const signOut = () => {

  setAccessToken("")
  window.localStorage.setItem('sessionId', "")
  window.localStorage.setItem('userId', "")
  window.localStorage.setItem('userEmail', "")
  window.localStorage.setItem('userNickname', "")
  window.location.href = '/access';

}