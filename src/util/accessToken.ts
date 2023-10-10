import { SessionData } from "../types";

export const setAccessToken = (accessToken: string) => {
  window.localStorage.setItem('accessToken', accessToken);
}

export const setSessionData = (sessionData: SessionData) => {
  window.localStorage.setItem('sessionId', sessionData.id)
  window.localStorage.setItem('userId', sessionData.userId)
  window.localStorage.setItem('userEmail', sessionData.userEmail)
  window.localStorage.setItem('userNickname', sessionData.userNickname)
}


export const getAccessToken = () => (window.localStorage.getItem('accessToken'))