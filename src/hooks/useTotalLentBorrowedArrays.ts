import { useQuery } from "@tanstack/react-query";

import { api } from "../apis/api";
import { GetTotalLentTotalBorrowedResponse } from "../types";

const useTotalLentBorrowedArrays = (startDate: string, endDate: string, currency:string) => {
  return useQuery<GetTotalLentTotalBorrowedResponse>({
    queryKey: ["totalLentBorrowed", startDate, endDate, currency],
    queryFn: () => api.getTotalLentBorrowedArrays(startDate, endDate, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

export default useTotalLentBorrowedArrays;
