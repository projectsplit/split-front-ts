import React from 'react'
import { StyledExpese } from './Expense.styled'
import Pill from './Pill/Pill'
import { ExpenseProps } from '../../../interfaces'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

export default function Expense({
  key,
  currency,
  description,
  amount,
  expenseTime,
  creationTime,
  lastUpdateTime,
  participants,
  payers }: ExpenseProps) {

  const calendarConfig = {
    sameDay: '[Today] DD MMMM',
    nextDay: '[Tomorrow] DD MMMM',
    nextWeek: 'dddd[, DD MMMM]',
    lastDay: '[Yesterday] DD MMMM',
    lastWeek: 'DD MMM',
    sameElse: 'DD MMM'
  }
  
  return (
    <StyledExpese >
      <div className='dateLocationAndCommentsStripe'>
        <div className='date'>
          {dayjs(creationTime).calendar(null, calendarConfig)}&nbsp;
        </div>
        <div className='time'>
          {dayjs(creationTime).format('HH:mm')}
        </div>

      </div>

      <div className='descrAndTotalStripe'>
        <div className='description'>"{description}"</div>
        <div className='totalAndAmount'>
          <div className='total'>Total</div>
          <div className='amount'> {amount}$</div>
        </div>
      </div>

      <div className='labelsAndPersonalInfoStripe'>
        <div className='labels'>
          <Pill title='food' color='blue' />
          <Pill title='rent' color='red' />
          <Pill title='drinks' color='yellow' />

        </div>
        <div className='personalInfo'>
          <div className='personalQuote'> You spent </div>
          <div className='amount'>10$</div>
        </div>
      </div>
    </StyledExpese>
  )
}
