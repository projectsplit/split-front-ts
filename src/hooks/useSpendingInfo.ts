import { useQuery } from "@tanstack/react-query";
import { SpendingInfoResponse, BudgetType } from "../types";
import { api } from "../apis/api";

const useSpendingInfo = (budgetType: BudgetType, currency: string) => {
  return useQuery<SpendingInfoResponse>({
    queryKey: ["spending", budgetType,currency],
    queryFn: () => api.getSpendingInfo(budgetType, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

export default useSpendingInfo;
