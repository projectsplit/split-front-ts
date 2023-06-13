import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, VerifyToken, SignIn, SignUp, Continue, Members, Transactions, VerifyInvitation } from './Components'
import { PrivateRoutes, RedirectToTransactions } from './routes'
import { Main } from './layouts';


function App() {

  return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/continue" element={<Continue />} />
        <Route path="/s/:token" element={<VerifyToken />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='i/:invitationCode' element={<VerifyInvitation />} />
          <Route path=':groupid' element={<Main />}>
            <Route index element={<RedirectToTransactions />} />
            <Route path='transactions' element={<Transactions />} />
            <Route path='members' element={<Members />} />
            <Route path='*' element={<RedirectToTransactions />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
