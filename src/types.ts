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

export type Label = {
  id: string,
  text: string,
  color: string,
}

export type Member = {
  memberId: string,
  permissions: number,
}