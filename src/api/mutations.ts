import { useMutation } from "@tanstack/react-query"
import { requestSignIn } from "./mutationFunctions"
import { OnErrorCallback, OnSuccessCallback } from "../types"

export function useCreateRequestSignInMutation(onError: OnErrorCallback, onSuccess: OnSuccessCallback) {

  return useMutation({

    mutationFn: (email: string) => requestSignIn(email),
    onError: onError,
    onSuccess: onSuccess
  })
} 
