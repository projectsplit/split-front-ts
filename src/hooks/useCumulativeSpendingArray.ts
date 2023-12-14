import { useQuery } from "@tanstack/react-query";

import { api } from "../apis/api";

const useCumulativeSpendingArray = (startDate: string, endDate: string) => {
  return useQuery<number[]>({
    queryKey: ["cumulativeSpending", startDate, endDate],
    queryFn: () => api.getCumulativeSpendingArray(startDate, endDate),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

export default useCumulativeSpendingArray;
