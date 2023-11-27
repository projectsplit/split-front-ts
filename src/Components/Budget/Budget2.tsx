import { Outlet } from "react-router-dom";
import { useRedirectToBudget } from "../../hooks/useRedirectToBudget";
import useBudgetInfo from "../../hooks/useBudgetInfo";

export default function Budget2() {

  const { data,isLoading } = useBudgetInfo();

  useRedirectToBudget(data, isLoading);
  
  return (
    <>
      <Outlet />
    </>
  );
}
