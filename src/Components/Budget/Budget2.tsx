import { Outlet } from "react-router-dom";
import {  BudgetType } from "../../types";
import { useRedirectToBudget } from "../../hooks/useRedirectToBudget";
import useBudgetInfo from "../../hooks/useBudgetInfo";

export default function Budget2() {

  const { data,isLoading } = useBudgetInfo(BudgetType.Monthly);

  useRedirectToBudget(data, isLoading);
  
  return (
    <>
      <Outlet />
    </>
  );
}
