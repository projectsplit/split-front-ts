import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home, VerifyEmailLinkToken, Members, Transactions, VerifyInvitation, GoogleSuccessRedirect, AccessScreen } from './components'
import { PrivateRoutes, RedirectToTransactions } from './routes'
import { Main } from './layouts'
import ContinueWithEmailLink from './components/ContinueWithEmailLink/ContinueWithEmailLink'

function App() {

  return (
    <Routes>
      <Route path="/email-continue" element={<ContinueWithEmailLink />} />
      <Route path="/access" element={<AccessScreen />} />
      <Route path="/redirect" element={<GoogleSuccessRedirect />} />
      <Route path="/v/:token" element={<VerifyEmailLinkToken />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='i/:invitationCode' element={<VerifyInvitation />} />
        <Route path=':groupid' element={<Main />}>
          <Route index element={<RedirectToTransactions />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='members' element={<Members />} />
          <Route path='*' element={<RedirectToTransactions />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
