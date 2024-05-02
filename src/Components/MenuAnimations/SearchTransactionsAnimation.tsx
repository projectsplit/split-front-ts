import React from "react";
import { CSSTransition } from "react-transition-group";
import { SearchTransactionAnimationProps } from "../../interfaces";
import SearchTransactions from "../Transactions/SearchTransactions/SearchTransactions";

export default function SearchTransactionsAnimation({
  menu,
}: SearchTransactionAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "search"}
      timeout={0}
      unmountOnExit
    >
      <SearchTransactions menu={menu}/>
    </CSSTransition>
  );
}
