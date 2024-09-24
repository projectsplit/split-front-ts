import { useQuery } from "@tanstack/react-query";
import { api } from "../apis/api";
import { FilterResponse } from "../types";


const useGroupFilters = (groupId:string) => {
  return useQuery<FilterResponse>({
    queryKey: ['transactions','filters'],
    queryFn: () => api.getGroupFilters(groupId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

export default useGroupFilters;
