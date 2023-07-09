import React, { useState } from 'react'
import { StyledExpenses } from './Expenses.styled'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../apis/api'
import ExpenseListItem from '../ExpenseListItem/ExpenseListItem'
import { Expense } from '../../types'
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails'
import Label from '../ColoredLabel/ColoredLabel'

export default function Expenses() {

  const [selectedExpenseId, setSelectedExpenseId] = useState('')

  const clickExpense = (id: string): void => {
    selectedExpenseId == id ? setSelectedExpenseId('') : setSelectedExpenseId(id)
  }

  const groupId = '63ff3865ea09adcc87e2359b'

  const { error, isFetched, isSuccess, data } = useQuery(
    ['getGroupExpenses', groupId],
    () => (groupId ? api.getGroupExpenses(groupId) : undefined),
    {
      enabled: !!groupId,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )

  interface GroupedExpenses {
    [date: string]: Expense[]
  }

  const groupByDate = (expenses: Expense[]) => {
    return expenses.reduce((grouped: GroupedExpenses, expense) => {
      const date = new Date(expense.expenseTime)
      const dateString = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()
      if (!grouped[dateString]) {
        grouped[dateString] = []
      }
      grouped[dateString].push(expense)
      return grouped
    }, {})
  }

  console.log(selectedExpenseId)

  if (!isFetched) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error occurred: {(error as Error).message}</div>
  }

  if (isSuccess) {

    const groupedExpenses = groupByDate(data as Expense[]);

    return (
      <StyledExpenses>
        {Object.keys(groupedExpenses).map((date) => (
          <React.Fragment key={date}>
            <div className='date'>{date}</div>
            {groupedExpenses[date].map((expense) => (
              <div key={expense.id} onClick={() => clickExpense(expense.id)}>
                {selectedExpenseId == expense.id ?
                  <ExpenseDetails id={expense.id} /> :
                  <ExpenseListItem expense={expense} />}
              </div>
            ))}
          </React.Fragment>
        ))}
      </StyledExpenses>
    )
  }

  return null
}
