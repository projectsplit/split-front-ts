import React, { useState } from 'react'
import { StyledExpenseForm } from './ExpenseForm.styled'
import { MultiValue } from 'react-select';
import MultiSelect from '../MultiSelect/MultiSelect';

type Option = { value: string; label: string }

export default function ExpenseForm() {

  const options = [
    { value: 'c43e1df2-5f6f-461f-9146-d087a55248e1', label: 'Kristi' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea64', label: 'Monti' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea61', label: 'Konti' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea65', label: 'Mario' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea66', label: 'Luigi' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea67', label: 'Kojia' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea68', label: 'Wasili' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea69', label: 'Pjotr' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea6a', label: 'Lenti' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea6b', label: 'Mimi' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea6c', label: 'Pipi' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea6d', label: 'Lelo' },
    { value: '50d3c88a-c31b-4194-ade2-93866b90ea6e', label: 'Miou' }
  ]

  const [expenseId, setExpenseId] = useState('')

  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState('')

  const [currency, setCurrency] = useState('')
  const [labelIds, setLabelIds] = useState([])
  const [location, setLocation] = useState('')

  const [participants, setParticipants] = useState<Option[]>([])
  const [participantsError, setParticipantsError] = useState([])

  const [payers, setPayers] = useState<Option[]>([])
  const [payersError, setPayersError] = useState([])

  const allOption = { value: 'selectAll', label: 'Select All' }

  function changeParticipants(selectedOptions: MultiValue<Option>) {
    return selectedOptions.includes(allOption) ?
      setParticipants(options) :
      setParticipants(selectedOptions ? [...selectedOptions] : [])
  }

  function changePayers(selectedOptions: MultiValue<Option>) {
    return selectedOptions.includes(allOption)
      ? setPayers(options)
      : setPayers(selectedOptions ? [...selectedOptions] : [])
  }

  console.log('participants')
  console.log(participants)

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
        <MultiSelect
          onChange={(selectedOptions: MultiValue<Option>) => changeParticipants(selectedOptions)}
          options={participants.length === options.length ? options : [allOption, ...options]}
          value={participants} />
        <div className='message'>Participants</div>
      </div>
      <div className='payers-section'>
        <MultiSelect
          onChange={(selectedOptions: MultiValue<Option>) => changePayers(selectedOptions)}
          options={payers.length === options.length ? options : [allOption, ...options]}
          value={payers} />
        <div className='message'>Payers</div>
      </div>
      <div className='location-section'></div>
    </StyledExpenseForm>
  )
}
