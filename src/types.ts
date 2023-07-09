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
  amount: number,
  currency: string,
  payers: Payer[],
  participants: Participant[],
  expenseTime: Date,
  labels: Label[],
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