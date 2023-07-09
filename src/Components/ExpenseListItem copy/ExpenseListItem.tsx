import React from 'react'
import { IoChatbubbleSharp, IoLocationSharp } from 'react-icons/io5'
import ColoredLabel from '../ColoredLabel/ColoredLabel'
import { StyledExpenseListItem } from '../ExpenseListItem/ExpenseListItem.styled'
import { Label } from '../../types'

interface ExpenseListItemProps {
  timestamp: Date,
  description: string,
  amount: number,
  currency: string,
  hasLocation: boolean,
  commentCount: number,
  labels: Label[]
}

export default function ExpenseListItem({
  timestamp,
  description,
  amount,
  currency,
  hasLocation,
  commentCount,
  labels
}: ExpenseListItemProps) {

  const expenseDate = new Date(timestamp)

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
          {labels.map(l => (<ColoredLabel label={l} key={l.id}/>))}
        </div>
      </div>
      <div className='bottom'>
        <div className='left'>
          <div className='description'>"{description}"</div>
        </div>
        <div className='right'>
          <div className='currency'>{currency}</div>
          <div className='amount'>{amount}</div>
        </div>
      </div>
    </StyledExpenseListItem>
  )
}
