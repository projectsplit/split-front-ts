import React from "react";
import { useRedirectToBudget } from "../hooks/useRedirectToBudget";
import { BudgetInfoResponse } from "../types";

interface RedirectToBudgetProps {
  data: BudgetInfoResponse | undefined;
  isLoading:boolean
}
export default function RedirectToBudget({ data,isLoading }: RedirectToBudgetProps) {
  useRedirectToBudget(data, isLoading);
  return <></>;
}
