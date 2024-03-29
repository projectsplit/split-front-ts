import { useQuery } from "@tanstack/react-query";
import { BudgetInfoResponse, Frequency } from "../types";
import { api } from "../apis/api";

const useBudgetInfo = () => {
  return useQuery<BudgetInfoResponse>({
    queryKey: ["budget"],
    queryFn: () => api.getBudgetInfo(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 9000,
    enabled: true,
  });
};

export default useBudgetInfo;
