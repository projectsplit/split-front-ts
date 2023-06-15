import { useMutation } from "@tanstack/react-query"
import { requestSignIn } from "./mutationFunctions"


export function useCreateRequestSignInMutation() {

  const request = useMutation({

    mutationFn: (email: string) => requestSignIn(email),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: () => {

    }
  })

  return request
} 
