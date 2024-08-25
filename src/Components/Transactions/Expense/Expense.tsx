import React from 'react'
import { StyledExpese } from './Expense.styled'
import Pill from '../../Pill/Pill'
import { ExpenseProps } from '../../../interfaces'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { Participant, Payer } from '../../../types'
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount'
dayjs.extend(calendar)

export default function Expense({
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

  const userSpent = (participants: Participant[]): string => {
    let spentAmount = "0";
    participants.map(p => {
      if (p.userId === localStorage.getItem("userId")) {
        spentAmount = p.participationAmount
      }
    })
    return spentAmount;
  }

  const isUserIncluded = (participants: Participant[], payers: Payer[]): boolean => {
    let isIncluded = false;
    participants.map(p => {
      if (p.userId === localStorage.getItem("userId")) {
        isIncluded = true
      }
    })
    payers.map(p => {
      if (p.userId === localStorage.getItem("userId")) {
        isIncluded = true
      }
    })
    return isIncluded
  }

  return (
    <StyledExpese >
      <div className='dateLocationAndCommentsStripe'>
        <div className='date'>
          {dayjs(expenseTime).calendar(null, calendarConfig)}&nbsp;
        </div>
        <div className='time'>
          {dayjs(expenseTime).format('HH:mm')}
        </div>
      </div>
      <div className='descrAndTotalStripe'>
        <div className='description'>"{description}"</div>
        <div className='totalAndAmount'>
          <div className='total'>Total</div>
          <div className='amount'> {displayCurrencyAndAmount(amount, currency)}</div>
        </div>
      </div>

      <div className='labelsAndPersonalInfoStripe'>
        <div className='labels'>
          <Pill title='food' color='blue' closeButton={false}/>
          <Pill title='rent' color='red' closeButton={false}/>
          <Pill title='drinks' color='yellow' closeButton={false}/>

        </div>
        <div className='personalInfo'>
          <div className='personalQuote'>{isUserIncluded(participants, payers) ? "You spent" : "You are not included"}  </div>
          <div className='amount'>{isUserIncluded(participants, payers) ? displayCurrencyAndAmount(userSpent(participants), currency) : ""}</div>
        </div>
      </div>
    </StyledExpese>
  )
}
