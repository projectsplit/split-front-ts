import { useNavigate, useLocation } from "react-router-dom";
import { BudgetInfoResponse } from "../types";
import { useEffect } from "react";

export const useRedirectToBudget = (
  data: BudgetInfoResponse | undefined,
  isLoading: boolean
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      (isLoading && location.pathname == "/budget/create") ||
      (!isLoading && location.pathname == "/budget/create")
    ) {
      navigate(location.pathname);
      console.log("navigation 1")
    } else if (isLoading) {
      navigate(location.pathname);
      console.log("navigation 2")
    } else if (data && data.budgetSubmitted) {
      navigate(`/budget/current`);
      console.log("navigation 3")
    } else {
      navigate(`/budget/create`);
      console.log("navigation 4")
    }
  }, [isLoading]);

  return null;
};
