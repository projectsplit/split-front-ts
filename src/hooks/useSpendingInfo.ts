import { useQuery } from "@tanstack/react-query";
import { SpendingInfoResponse, BudgetType } from "../types";
import { api } from "../apis/api";

const useSpendingInfo = (budgetType: BudgetType) => {
  return useQuery<SpendingInfoResponse>({
    queryKey: ["spending", budgetType],
    queryFn: () => api.getSpendingInfo(budgetType, "USD"),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

export default useSpendingInfo;
