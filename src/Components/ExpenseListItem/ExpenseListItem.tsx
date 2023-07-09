import React from 'react'
import { StyledExpenseListItem } from './ExpenseListItem.styled'
import { IoChatbubbleSharp, IoLocationSharp } from 'react-icons/io5'
import ColoredLabel from '../ColoredLabel/ColoredLabel'
import { Expense } from '../../types'

interface ExpenseListItemProps {
  expense: Expense
}

export default function ExpenseListItem({
  expense
}: ExpenseListItemProps) {

  const expenseDate = new Date(expense.expenseTime)
  const commentCount = 5
  const hasLocation = true

  return (
    <StyledExpenseListItem>
      <div className='top'>
        <div className='left'>
          <div className='time'>{expenseDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
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
        <div className='right'>
          {expense.labels.map(l => (<ColoredLabel label={l} key={l.id}/>))}
        </div>
      </div>
      <div className='bottom'>
        <div className='left'>
          <div className='description'>"{expense.description}"</div>
        </div>
        <div className='right'>
          <div className='currency'>{expense.currency}</div>
          <div className='amount'>{expense.amount}</div>
        </div>
      </div>
    </StyledExpenseListItem>
  )
}
