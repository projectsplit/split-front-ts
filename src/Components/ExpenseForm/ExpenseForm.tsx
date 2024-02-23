import { useState } from 'react'
import { StyledExpenseForm } from './ExpenseForm.styled'
import dayjs, { Dayjs } from 'dayjs'
import { ExpenseA, ExpenseFormProps, Group, PickerLabel, PickerMember } from '../../types'
import { MemberAmountPicker } from '../MemberAmountPicker/MemberAmountPicker'
import { LabelPicker } from '../LabelPicker/LabelPicker'
import { DateTime } from '../DateTime/DateTime'

export const ExpenseForm = ({ group, expense }: ExpenseFormProps) => {

  const createParticipantPickerRecord = (group: Group, expense: ExpenseA | null): Record<string, PickerMember> => {

    const memberIds = [...group.members.guests.map(g => g.memberId), ...group.members.users.map(u => u.memberId)]

    return memberIds.reduce<Record<string, PickerMember>>((rec, id) => {
      rec[id] = {
        id: id,
        amount: expense?.participants.find(p => p.memberId == id)?.participationAmount ?? '',
        locked: false,
        name: group.members.guests.find(g => g.memberId == id)?.name ?? group.members.users.find(u => u.memberId == id)?.name ?? 'NO_NAME',
        order: 0,
        selected: expense?.participants.find(p => p.memberId == id) ? true : false
      }
      return rec
    }, {})
  }

  const createPayerPickerRecord = (group: Group, expense: ExpenseA | null): Record<string, PickerMember> => {

    const memberIds = [...group.members.guests.map(g => g.memberId), ...group.members.users.map(u => u.memberId)]

    return memberIds.reduce<Record<string, PickerMember>>((rec, id) => {
      rec[id] = {
        id: id,
        amount: expense?.payers.find(p => p.memberId == id)?.paymentAmount ?? '',
        locked: false,
        name: group.members.guests.find(g => g.memberId == id)?.name ?? group.members.users.find(u => u.memberId == id)?.name ?? 'NO_NAME',
        order: 0,
        selected: expense?.payers.some(p => p.memberId == id) ?? false
      }
      return rec
    }, {})
  }

  const createLabelPickerRecord = (group: Group, expense: ExpenseA | null): Record<string, PickerLabel> => {
    return group.labels.reduce<Record<string, PickerLabel>>((rec, label) => {
      rec[label.id] = {
        id: label.id,
        color: label.color,
        text: label.text,
        selected: expense?.labels.some(l => l === label.id) ?? false
      }
      return rec
    }, {})
  }

  const [description, setDescription] = useState<string>(expense?.description ?? '')
  const [amount, setAmount] = useState<string>(expense?.amount ?? '')
  const [currency, setCurrency] = useState<string>(expense?.currency ?? '')
  const [labels, setLabels] = useState<Record<string, PickerLabel>>(createLabelPickerRecord(group, expense))
  const [participants, setParticipants] = useState<Record<string, PickerMember>>(createParticipantPickerRecord(group, expense))
  const [payers, setPayers] = useState<Record<string, PickerMember>>(createPayerPickerRecord(group, expense))
  const [expenseTime, setExpenseTime] = useState<Dayjs>(dayjs(expense?.expenseTime ?? new Date))

  return (
    <StyledExpenseForm>
      <div className='amount-section'>
        <div className='message'>Amount</div>
        <input className='input' value={amount} placeholder={'0' + currency} onChange={e => setAmount(e.target.value)}>
        </input>
      </div>
      <div className='description-section'>
        <div className='message'>Description</div>
        <input className='input' value={description} placeholder='e.g. Air tickets' onChange={e => setDescription(e.target.value)}>
        </input>
      </div>
      <div className='labels-section'>
        <div className='message'>Labels</div>
        <LabelPicker labels={labels} setLabels={setLabels} />
      </div>
      <div className='participants-section'>
        <div className='message'>Participants</div>
        <MemberAmountPicker totalAmount={parseFloat(amount)} memberAmounts={participants} setMemberAmounts={setParticipants} />
      </div>
      <div className='payers-section'>
        <div className='message'>Payers</div>
        <MemberAmountPicker totalAmount={parseFloat(amount)} memberAmounts={payers} setMemberAmounts={setPayers} />
      </div>
      <div className='time-section'>
        <DateTime selectedDateTime={expenseTime} setSelectedDateTime={setExpenseTime} />
      </div>
    </StyledExpenseForm >
  )
}