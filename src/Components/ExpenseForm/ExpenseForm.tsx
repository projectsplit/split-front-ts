import React, { useState } from 'react'
import { StyledExpenseForm } from './ExpenseForm.styled'
import MultiSelection from '../MultiSelection/MultiSelection';

export default function ExpenseForm() {

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  
  return (
    <StyledExpenseForm>
      <div className='amount-section'>
        <input className='input' value={amount} placeholder='0' onChange={e => setAmount(e.target.value)}>
        </input>
        <div className='message'>Amount</div>
      </div>
      <div className='description-section'>
        <input className='input' value={description} placeholder='e.g. Air tickets' onChange={e => setDescription(e.target.value)}>
        </input>
        <div className='message'>Description</div>
      </div>
      <div className='participants-section'>
        <MultiSelection />
        <div className='message'>Participants</div>
      </div>
      <div className='payers-section'>
        <MultiSelection />
        <div className='message'>Payers</div>
      </div>
      <div className='location-section'></div>
    </StyledExpenseForm>
  )
}
