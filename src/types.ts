export type OnErrorCallback = (error: any) => void;
export type OnSuccessCallback = (success: any) => void;

export type RequestSignInRequest = {
  email: string
}

export type RequestSignUpRequest = {
  email: string,
  nickname: string
}

export type RequestSignInResponse = {
  // Define the response data structure here
}

export type RequestSignUpResponse = {
  // Define the response data structure here
}

// export type RefreshAccessTokenRequest = {
// }

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

export type VerifyEmailLinkTokenRequest = {
  token: string | undefined
}

export type VerifyEmailLinkTokenResponse = {
  type: string
}

export type ContinueSignInReponse = {
  accessToken: string,
  sessionData: SessionData
}

export type ContinueWithGoogleRequest = {
  RedirectUrl: string

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