import { useQuery } from "@tanstack/react-query";
import { getGroupById } from "./queryFunctions";

export function useGetGroupById() {

  return useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroupById("640f58b7435d877f0e088bd6")
  })
}