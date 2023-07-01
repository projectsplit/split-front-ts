import React from 'react'
import { signOut } from '../../util/signOut'

export default function Home() {



  return (
    <div>
      Home
      <button onClick={signOut}>sign out</button>
    </div>
  );
}