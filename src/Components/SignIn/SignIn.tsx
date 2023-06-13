import React from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function SignIn() {
  const [signInEmail, setSignInEmail] = useState<string>("")

  const changeEmail = (e: any) => {
    setSignInEmail(e.target.value)
  }

  return (
    <div>
      <input
        inputMode='email'
        value={signInEmail}
        placeholder='john@rambo.com'
        onChange={e => changeEmail(e)}
      />
      <button>Submit</button>
    </div>
  )
}
