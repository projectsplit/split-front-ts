import React from 'react'
import { StyledExpenseDetails } from './ExpenseDetails.styled'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../apis/api'
import ColoredLabel from '../ColoredLabel/ColoredLabel'
import ExpenseDetailsParticipants from './Participants/ExpenseDetailsParticipants'
import ExpenseDetailsPayers from './Payers/ExpenseDetailsPayers'

interface ExpenseDetailsProps {
  id: string
}

export default function ExpenseDetails({ id }: ExpenseDetailsProps) {

  const { error, isFetched, isSuccess, data } = useQuery(
    ['getExpense', id],
    () => api.getExpense(id),
    {
      enabled: !!id,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 0,
      cacheTime: 0
    }
  )

  if (error) {
    return <div>ERROR</div>
  }

  if (!isFetched || !data) {
    return <div>Loading...</div>
  }

  const expenseTime = new Date(data.expenseTime)

  return (
    <StyledExpenseDetails>
      <div className='top-bar'>
        <div className='time'>{expenseTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
        <div className='labels'>{data.labels.map(l => <ColoredLabel label={l} />)}</div>
      </div>
      <div className='description'>"{data.description}"</div>
      <div className='amount'>{data.currency} {data.amount}</div>
      <ExpenseDetailsParticipants participants={data.participants} totalAmount={data.amount} currency={data.currency} />
      <ExpenseDetailsPayers payers={data.payers} totalAmount={data.amount} currency={data.currency} />
      <div className='location'>location example</div>
      <div className='actions'>
        <div className='edit'>edit</div>
        <div className='delete'>delete</div>
      </div>
      <div className='subtitle'>Created by Kristiani at Wednesday, April 19, 2023, 15:30</div>
      <div className='comments'></div>
    </StyledExpenseDetails>
  )
}
