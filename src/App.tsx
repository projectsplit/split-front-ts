import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  Home,
  VerifyEmailLinkToken,
  Members,
  Transactions,
  VerifyInvitation,
  GoogleSuccessRedirect,
  AccessScreen,
} from './components'
import { PrivateRoutes, RedirectToTransactions } from './routes'
import { Main } from './layouts'
import ContinueWithEmailLink from './components/ContinueWithEmailLink/ContinueWithEmailLink'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/global'
import Expenses from './components/Expenses/Expenses'
import { useQuery } from '@tanstack/react-query'
import { api } from './apis/api'
import { ExpenseForm } from './components/ExpenseForm/ExpenseForm'

function App() {

  // const theme = {
  //   colors: {
  //     body: '#0E0E10',
  //     text: '#26272B',
  //     whiteText: '#DDDDDD',
  //     lightColor: '#f5f5f5',
  //     pink: '#f91880',
  //     green: '#00ba7c',
  //     layer1: '#1f1f22',
  //     layer2: '#18181B',
  //     layer6: '#a3a3a3',
  //     labelColor6: '#8594E0',
  //     color10: '#3B3B3D',
  //   },
  // }

  const theme = {
    font: {
      family: `'Nunito Variable', sans-serif`,
      tiny: '12px',
      small: '16px',
      default: '20px',
      large: '24px'
    },
    color: {
      background0: '#0E0E10',
      background1: '#18181B',
      background2: '#18181B',
      border1: '#232323',
      accent: '#D2DDFF',
      text1: '#DDDDE0',
      text2: '#77777A',
      text3: '#444447',
    },
    colors: {
      body: '#0E0E10',
      text: '#26272B',
      whiteText: '#DDDDDD',
      lightColor: '#f5f5f5',
      pink: '#f91880',
      green: '#00ba7c',
      layer1: '#1f1f22',
      layer2: '#18181B',
      layer6: '#a3a3a3',
      labelColor6: '#8594E0',
      color10: '#3B3B3D',
    }
  }

  const getGroup = useQuery({
    queryKey: ['Group', '63ff3865ea09adcc87e2359b'],
    queryFn: () => api.getGroup('63ff3865ea09adcc87e2359b'),
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  })

  const getExpense = useQuery({
    queryKey: ['Expense', '63ff60cfa2699e72f832cbdd'],
    queryFn: () => api.getExpense('63ff60cfa2699e72f832cbdd'),
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  })

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Routes>
          <Route path='/email-continue' element={<ContinueWithEmailLink />} />
          <Route path='/access' element={<AccessScreen />} />
          <Route path='/redirect' element={<GoogleSuccessRedirect />} />
          <Route path='/v/:token' element={<VerifyEmailLinkToken />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/create' element={getGroup.isSuccess && getExpense.isSuccess && <ExpenseForm group={getGroup.data} expense={getExpense.data ?? null} />} />
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
      </>
    </ThemeProvider>
  )
}

export default App
