import { useMutation } from "@tanstack/react-query"
import { requestSignIn } from "./mutationFunctions"


export function useCreateRequestSignInMutation() {

  const request = useMutation({

    mutationFn: (email: string) => requestSignIn(email),
    onSuccess: (response) => {
      // console.log("onSuccess response: " + response)
    },
    onError: (error: any) => {
      // console.log("onError error:", error);
      // console.log("onError error:", error.response.status);
    },
    onSettled(data, error, variables, context) {
      // console.log("onSettled data: " + data)
      // console.log("onSettled error: " + error)
      // console.log("onSettled variables: " + variables)
      // console.log("onSettled context: " + context)
    },
    onMutate(variables) {
      // console.log("onMutate variables: " + variables)
    },
  })

  return request
} 
