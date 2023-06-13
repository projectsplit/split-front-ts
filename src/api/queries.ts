import { useQuery } from "@tanstack/react-query";
import { getGroups } from "./queryFunctions";

export function useGetGroupById() {

  const group = useQuery({

    queryKey: ["groups"],
    queryFn: getGroups
  })

  return group
}