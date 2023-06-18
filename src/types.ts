export type SignInWithEmailLinkRequest = {
  email: string
}

export type SignInWithEmailLinkResponse = {
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
  token: string
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
