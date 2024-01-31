import { useQuery } from "@tanstack/react-query";

import { api } from "../apis/api";

const useCumulativeSpendingArray = (startDate: string, endDate: string, currency: string) => {
  return useQuery<number[]>({
    queryKey: ["cumulativeSpending", startDate, endDate, currency],
    queryFn: () => api.getCumulativeSpendingArray(startDate, endDate, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

export default useCumulativeSpendingArray;
