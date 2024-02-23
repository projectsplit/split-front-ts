import React from 'react'
import { StyledExpenseListItem } from './ExpenseListItem.styled'
import { IoChatbubbleSharp, IoLocationSharp } from 'react-icons/io5'
import ColoredLabel from '../ColoredLabel/ColoredLabel'
import { Expense } from '../../types'

interface ExpenseListItemProps {
  expense: Expense
}

export const ExpenseListItem = ({ expense }: ExpenseListItemProps) => {

  const userMemberId = '50d3c88a-c31b-4194-ade2-93866b90ea64'

  const expenseDate = new Date(expense.expenseTime)
  const commentCount = 5
  const hasLocation = true

  console.log(expense)

  return (
    <StyledExpenseListItem>
      <div className='top'>
        <div className='left'>
          <div className='time'>{expenseDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
          {expense.labels.map(l => (<ColoredLabel label={l} key={l.id} />))}
        </div>
        <div className='right'>
          <div className='icons'>
            {commentCount > 0 &&
              <div className='comments'>
                <IoChatbubbleSharp />
                <span>{commentCount}</span>
              </div>}
            {hasLocation &&
              <div className='location'>
                <IoLocationSharp />
              </div>}
          </div>
        </div>
      </div>
      <div className='middle'>
        <div className='left'>
          <div className='description'>{expense.description}</div>
        </div>
        <div className='right'>
          {/* <div className='currency'>{expense.currency}</div> */}
          <div className='amount'>
            {`${parseInt(expense.amount) % 2 == 0 ? '$' : '€'}${parseFloat(expense.participants.find(p => p.memberId == userMemberId)?.participationAmount ?? '0').toFixed(2)}`}
          </div>
        </div>
      </div>
      <div className='bottom'>
        <div className='left'>
        </div>
        <div className='right'>
          {/* <div className='currency'>{expense.currency}</div> */}
          <div className='amount'>{`${parseInt(expense.amount) % 2 == 0 ? '$' : '€'}${parseFloat(expense.amount).toFixed(2)} (Group)`}</div>
        </div>
      </div>
    </StyledExpenseListItem>
  )
}
