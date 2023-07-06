import { useEffect, useState } from "react"

declare global {
  interface Window {
    google: any
  }
}

export default function GoogleSignInButton() {

  const [credentials, setCredentials] = useState("");

  const handleCredentialResponse = (response: any) => {
    if (response) {
      console.log(response.credential)
      setCredentials(response.credential);
    }
  }

  const initializeGsi = () => {
    window.google.accounts.id.initialize({
      client_id: '567397512612-s1uen7oo0e134no5enjv5dekat7qc3q1.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      // ux_mode: 'redirect',
      // login_uri: 'http://localhost:3000/redirect'
    })
    window.google.accounts.id.renderButton(
      document.getElementById('my-signin-button'),
      { theme: 'outline', size: 'large' }
    )
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        setCredentials("");
      }
    })
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.onload = initializeGsi
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div>
      <div id="my-signin-button" className="g_id_signin"></div>
      <pre>{credentials}</pre>
    </div>
  )
}