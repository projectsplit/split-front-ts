import React, { useEffect, useRef, useState } from "react";
import { StyledTransactions } from "./Transactions.styled";
import Expense from "./Expense/Expense";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../apis/api";
import { useParams } from "react-router-dom";
import { calculateDistanceFromTop } from "../../helpers/calculateDistanceFromTop";
import Spinner from "../Spinner/Spinner";

export default function Transactions() {
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const params = useParams();
  const elRef = useRef<HTMLDivElement>(null);
  const heightFromTop = window.innerHeight - calculateDistanceFromTop(elRef); //(58 + 36 + 18 + 4 + 30)
  const fittingItems = Math.round(heightFromTop / 100);

  const {
    // isLoading,
    // isError,
    // error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["transactions", "active", params.groupid as string],
    ({ pageParam }) =>
      api.getGroupTransactions(fittingItems, params.groupid as string, {
        pageParam,
      }), //TODO handle case of undefined groupId
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.length > 0) {
          const lastTransaction = lastPage[lastPage.length - 1];
          const { transactionTime } = lastTransaction;
          return transactionTime;
        } else return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 9000,
      enabled: true,
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const target = event.target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } = target;

      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;

        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    const scrollableElement = elRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", onScroll);
    }
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", onScroll);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      const monthYearElements = document.querySelectorAll(".monthYearSticky");
      monthYearElements.forEach((element) => {
        const monthYear = element.textContent; // Access textContent safely
        if (monthYear && element.getBoundingClientRect().top <= 0) {
          setCurrentMonthYear(monthYear);
        }
      });
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const groupedTransactions: { [key: string]: any[] } = {};

  data?.pages.flatMap((page: any) =>
    page.forEach((transaction: any) => {
      const transactionTime = new Date(transaction.transactionTime);
      const monthYear = transactionTime.toLocaleDateString("en-US", {
        month: "long", // Full name of the month
        year: "numeric", // Year
      });

      if (!groupedTransactions[monthYear]) {
        groupedTransactions[monthYear] = [];
      }

      groupedTransactions[monthYear].push(transaction);
    })
  );


  return (
    <StyledTransactions ref={elRef}>
      {isFetching && data === undefined ? <Spinner /> : null}
      <div className="transactionField">
        {Object.entries(groupedTransactions).map(
          ([monthYear, transactions]) => (
            <div key={monthYear}>
              {/* Sticky header */}
              <div
                className={`monthYearSticky ${
                  currentMonthYear === monthYear ? "show" : ""
                }`}
              >
                <div className="monthYear">{monthYear}</div>
              </div>
              <div className="transactionList">
                {transactions.map((transaction) =>
                  transaction?.transfer === null ? (
                    <Expense
                      key={transaction.expense.id}
                      amount={transaction.expense.amount}
                      creationTime={transaction.expense.creationTime}
                      currency={transaction.expense.currency}
                      description={transaction.expense.description}
                      expenseTime={transaction.expense.expenseTime}
                      lastUpdateTime={transaction.expense.lastUpdateTime}
                      participants={transaction.expense.participants}
                      payers={transaction.expense.payers}
                    />
                  ) : (
                    <div key={transaction.transfer.id}>
                      {transaction.transfer.id}
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
        {isFetchingNextPage && <Spinner />}
      </div>
    </StyledTransactions>
  );
}
