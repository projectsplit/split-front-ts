import React, { useState } from 'react'
import { StyledExpenseDetailsPayers } from './ExpenseDetailsPayers.styled'

interface ExpenseDetailsPayersProps {
  totalAmount: string,
  currency: string,
  payers: {
    memberId: string,
    name: string,
    amount: string
  }[]
}

export default function ExpenseDetailsPayers({ totalAmount, currency, payers }: ExpenseDetailsPayersProps) {

  const [showDetails, setShowDetails] = useState(false)
  
  const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  return (
    <StyledExpenseDetailsPayers onClick={click}>
      <div className='header'>
        <div className='text'>Paid by {payers.length} member{payers.length > 1 && 's'}</div>
        <div className='button' >{showDetails ? 'hide details' : 'show details'}</div>
      </div>
      {showDetails && payers.map(p =>
        <div className='details'>
          <div className='name'>{p.name}</div>
          <div className='amount'>{currency} {p.amount}</div>
          <div className='percentage'>{(Number(p.amount) / Number(totalAmount) * 100).toFixed(2)}%</div>
        </div>)
      }
    </StyledExpenseDetailsPayers>
  )
}
