import { useQuery } from "@tanstack/react-query";
import { BudgetInfoResponse, BudgetType } from "../types";
import { api } from "../apis/api";

const useMonthlyBudgetInfo = (budgetType: BudgetType) => {
  return useQuery<BudgetInfoResponse>({
    queryKey: ["budget", budgetType],
    queryFn: () => api.getBudgetInfo(budgetType, "USD"),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

export default useMonthlyBudgetInfo;
