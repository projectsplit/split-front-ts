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

export type CreateFiltersRequest = {
  groupId:string;
  participantsIds?:string[];
  payersIds?:string[];
  receiversIds?:string[];
  sendersIds?:string[];
  before?:Date;
  after?:Date;
}

export type FilterResponse = {
  payers:FetchedMembers;
  participants:FetchedMembers;
  senders:FetchedMembers;
  receivers:FetchedMembers;
  // before?:Date;
  // after?:Date;
}

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

export type Participant = {
  name: string;
  participationAmount: string;
  userId: string;
}
export type Payer = {
  name: string;
  paymentAmount: string;
  userId: string;
}

export type SerializedLexicalNode = {
  type: string;
  [key: string]: any;
};

export type SerializedElementNode = SerializedLexicalNode & {
  children: SerializedLexicalNode[];
};

export type FetchedMember = {
  memberId:string;
  value: string;
};

export type FetchedMembers= FetchedMember[]

export type EnhancedMembersWithProps = {
  value: string;
  memberId: string;
  prop: string;
}[]

export type Members = {
  payers: FetchedMembers;
  participants: FetchedMembers;
  senders: FetchedMembers;
  receivers: FetchedMembers; 
};