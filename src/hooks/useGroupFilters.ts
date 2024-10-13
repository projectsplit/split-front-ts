import { useQuery } from "@tanstack/react-query";
import { api } from "../apis/api";
import { FilterResponse } from "../types";


const useGroupFilters = (groupId:string | undefined) => {
  return useQuery<FilterResponse>({
    queryKey: ['transactions','filters'],
    queryFn: () => groupId ? api.getGroupFilters(groupId) : Promise.reject(new Error('No groupId')),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: !!groupId,
  });
};

export default useGroupFilters;
