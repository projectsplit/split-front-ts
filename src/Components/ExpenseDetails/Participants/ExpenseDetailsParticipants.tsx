import React, { useState } from 'react'
import { StyledExpenseDetailsParticipants } from './ExpenseDetailsParticipants.styled'

interface ExpenseDetailsParticipantsProps {
  totalAmount: string,
  currency: string,
  participants: {
    memberId: string,
    name: string,
    amount: string
  }[]
}

export default function ExpenseDetailsParticipants({ totalAmount, currency, participants }: ExpenseDetailsParticipantsProps) {

  const [showDetails, setShowDetails] = useState(false)
  
  const clickShow = (e: any) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  return (
    <StyledExpenseDetailsParticipants onClick={clickShow}>
      <div className='header'>
        <div className='text'>Split among {participants.length} member{participants.length > 1 && 's'}</div>
        <div className='button' >{showDetails ? 'hide details' : 'show details'}</div>
      </div>
      {showDetails && participants.map(p =>
        <div className='details'>
          <div className='name'>{p.name}</div>
          <div className='amount'>{currency} {p.amount}</div>
          <div className='percentage'>{(Number(p.amount) / Number(totalAmount) * 100).toFixed(2)}%</div>
        </div>)
      }
    </StyledExpenseDetailsParticipants>
  )
}
