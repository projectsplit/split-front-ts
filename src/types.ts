export type OnErrorCallback = (error: any) => void;
export type OnSuccessCallback = (success: any) => void;

export type EmailInitiateRequest = {
  email: string;
};

export type RefreshAccessTokenResponse = {
  accessToken: string;
};

export type GetGroupRequest = {
  id: string;
};

export type GetGroupResponse = {
  id: string;
  ownerId: string;
  title: string;
  labels: Label[];
  baseCurrency: string;
  members: Member[];
  creationTime: Date;
  lastUpdateTime: Date;
};

export type GroupsTotalAmountsResponse = {
  numberOfGroups: number;
  userIsOwedAmounts: { [currency: string]: number };
  userOwesAmounts: { [currency: string]: number };
};

export type EmailVerifyLinkRequest = {
  token: string;
};

export type EmailVerifyLinkResponse = {
  userCreated: boolean;
};

export type ContinueReponse = {
  accessToken: string;
  sessionData: SessionData;
};

export type GoogleContinueRequest = {
  RedirectUrlSearchParameters: string;
};

export type SessionData = {
  id: string;
  userId: string;
  userEmail: string;
  userNickname: string;
};

export type Label = {
  id: string;
  text: string;
  color: string;
};

export type Member = {
  memberId: string;
  permissions: number;
};

export type UserPendingTransaction = {
  userIsSender: boolean;
  userIsReceiver: boolean;
  amount: number;
  currency: string;
};

// export enum BudgetType {
//   Weekly,
//   Monthly,
// }

// export enum CycleType {
//   Weekly,
//   Monthly,
//   Annually,
// }

export enum Frequency {
  Weekly,
  Monthly,
  Annually,
}

export type CreateBudgetRequest = {
  amount: string;
  currency: string;
  budgetType: Frequency;
  day: string | null;
};

export type BudgetInfoResponse = {
  budgetSubmitted: boolean;
  averageSpentPerDay?: string;
  remainingDays?: string;
  totalAmountSpent?: string;
  goal?: string;
  currency?: string;
  budgetType?: Frequency;
  startDate?: any;
  endDate?: any;
};

export type SpendingInfoResponse = {
  budgetSubmitted: boolean;
  totalAmountSpent: string;
  currency: string;
};

export type GetTotalLentTotalBorrowedResponse = {
  totalBorrowed: number[];
  totalLent: number[];
};

export type Currency = {
  symbol: string;
  name: string;
  flagClass: string;
};

export type Participant={
  name:string;
  participationAmount:string;
}
export type Payer = {
  name:string;
  paymentAmount:string;
}