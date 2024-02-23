import { Dayjs } from "dayjs";

export type OnErrorCallback = (error: any) => void;
export type OnSuccessCallback = (success: any) => void;

export type EmailInitiateRequest = {
  email: string
}

export type RefreshAccessTokenResponse = {
  accessToken: string
}

export type GetGroupRequest = {
  id: string
}

export type GetGroupResponse = {
  id: string,
  ownerId: string,
  title: string,
  labels: Label[],
  baseCurrency: string,
  members: Member[],
  creationTime: Date,
  lastUpdateTime: Date,
}

export type Participant = {
  memberId: string,
  participationAmount: string
}

export type Payer = {
  memberId: string,
  paymentAmount: string
}

export type Expense = {
  id: string,
  groupId: string,
  description: string,
  amount: string,
  currency: string,
  payers: Payer[],
  participants: Participant[],
  expenseTime: Date,
  labels: Label[],
  creationTime: Date,
  lastUpdateTime: Date,
}

export type ExpenseA = {
  id: string,
  groupId: string,
  amount: string,
  currency: string,
  description: string,
  payers: Payer[],
  participants: Participant[],
  expenseTime: Date,
  labels: string[],
  creationTime: Date,
  lastUpdateTime: Date,
}

export type GetGroupExpensesResponse = Expense[]

export type EmailVerifyLinkRequest = {
  token: string
}

export type EmailVerifyLinkResponse = {
  userCreated: boolean
}

export type ContinueReponse = {
  accessToken: string,
  sessionData: SessionData
}

export type GoogleContinueRequest = {
  RedirectUrlSearchParameters: string
}

export type SessionData = {
  id: string,
  userId: string,
  userEmail: string,
  userNickname: string
}

export interface Label {
  id: string,
  text: string,
  color: string,
}

export interface GroupLabel {
  id: string,
  text: string,
  color: string,
}

export type Member = {
  memberId: string,
  permissions: number,
}

export type GetExpenseResponse = {
  id: string,
  groupId: string,
  description: string,
  amount: string,
  currency: string,
  labels: Label[],
  participants: {
    memberId: string,
    name: string,
    amount: string
  }[],
  payers: {
    memberId: string,
    name: string,
    amount: string
  }[],
  expenseTime: Date,
  creationTime: Date,
  lastUpdateTime: Date
}

export interface DayPickerProps {
  selectedDateTime: Dayjs
  setSelectedDateTime: React.Dispatch<React.SetStateAction<Dayjs>>
}

export interface MonthYearPickerProps {
  selectedDateTime: Dayjs
  setSelectedDateTime: React.Dispatch<React.SetStateAction<Dayjs>>
}

export interface ScrollPickerProps {
  items: string[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}

export interface DateTimePickerProps {
  selectedDateTime: Dayjs
  setSelectedDateTime: React.Dispatch<React.SetStateAction<Dayjs>>
  realtimeUpdate: boolean
  setRealtimeUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export interface DateTimeProps {
  selectedDateTime: Dayjs
  setSelectedDateTime: React.Dispatch<React.SetStateAction<Dayjs>>
}

export interface GroupMember {
  memberId: string
  name: string
}

// export interface ExpenseFormProps {
//   id: string
//   userMemberId: string
//   groupId: string
//   groupMembers: GroupMember[]
//   grouplabels: Label[]
//   description: string
//   amount: string
//   currency: string
//   labelIds: string[]
//   payers: Payer[]
//   participants: Participant[]
//   expenseTime: Date
//   creationTime: Date
//   lastUpdateTime: Date
// }

export interface ExpenseFormProps {
  group: Group
  expense: ExpenseA | null
}

export interface UserMember {
  memberId: string
  name: string
  permissions: number
}

export interface GuestMember {
  memberId: string
  name: string
}

export interface Group {
  id: string
  title: string
  currency: string
  ownerId: string
  members: {
    guests: GuestMember[]
    users: UserMember[]
  }
  labels: Label[]
  creationTime: Date
  lastUpdateTime: Date
}

export interface LabelPickerProps {
  labels: Record<string, PickerLabel>
  setLabels: React.Dispatch<React.SetStateAction<Record<string, PickerLabel>>>
}

export interface PickerMember {
  id: string
  name: string
  amount: string
  selected: boolean
  locked: boolean
  order: number
}

export interface PickerLabel {
  id: string
  text: string
  color: string
  selected: boolean
}

export interface MemberAmountPickerProps {
  totalAmount: number
  memberAmounts: Record<string, PickerMember>
  setMemberAmounts: React.Dispatch<React.SetStateAction<Record<string, PickerMember>>>
}