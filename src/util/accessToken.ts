export const setAccessToken = (accessToken: string) => {
  window.localStorage.setItem('accessToken', accessToken);
}
export const getAccessToken = () => (window.localStorage.getItem('accessToken'))