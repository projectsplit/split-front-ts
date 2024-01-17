import { useQuery } from "@tanstack/react-query";

import { api } from "../apis/api";
import { GetTotalLentTotalBorrowedResponse } from "../types";

const useTotalLentBorrowedArrays = (startDate: string, endDate: string) => {
  return useQuery<GetTotalLentTotalBorrowedResponse>({
    queryKey: ["totalLentBorrowed", startDate, endDate],
    queryFn: () => api.getTotalLentBorrowedArrays(startDate, endDate),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

export default useTotalLentBorrowedArrays;
