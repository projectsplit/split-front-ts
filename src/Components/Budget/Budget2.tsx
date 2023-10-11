import { Outlet } from "react-router-dom";
import {  BudgetType } from "../../types";
import { useRedirectToBudget } from "../../hooks/useRedirectToBudget";
import useMonthlyBudgetInfo from "../../hooks/useMonthlyBudgetInfo";

export default function Budget2() {

  const { data,isLoading } = useMonthlyBudgetInfo(BudgetType.Monthly);

  useRedirectToBudget(data, isLoading);
  
  return (
    <>
      <Outlet />
    </>
  );
}
