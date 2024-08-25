import React, { useEffect, useRef } from "react";
import { StyledTransactions } from "./Transactions.styled";
import Expense from "./Expense/Expense";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../apis/api";
import { useParams } from "react-router-dom";
import { calculateDistanceFromTop } from "../../helpers/calculateDistanceFromTop";
import Spinner from "../Spinner/Spinner";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSignal } from "@preact/signals-react";
import MenuAnimationBackground from "../MenuAnimations/MenuAnimationBackground";
import SearchTransactionsAnimation from "../MenuAnimations/SearchTransactionsAnimation";
import { EnhancedMembersWithProps, FetchedMembers } from "../../types";

export default function Transactions() {
  const params = useParams();
  const menu = useSignal<string | null>(null);

  // const filters = useSignal<Filters>({
  //   payersIds: (localStorage.getItem("payersIds") || ""),
  //   participantsIds: (localStorage.getItem("participantsIds") || ""),
  //   keyWords: (localStorage.getItem("keyWords") || "")
  // });
  const payersIds = useSignal<string[]>(
    JSON.parse(localStorage.getItem("payersIds") ?? "[]")
  );
  const participantsIds = useSignal<string[]>(
    JSON.parse(localStorage.getItem("participantsIds") ?? "[]")
  );
  const keyWords = useSignal<string[]>(
    JSON.parse(localStorage.getItem("keyWords") ?? "[]")
  );

  const elRef = useRef<HTMLDivElement>(null);
  const heightFromTop = window.innerHeight - calculateDistanceFromTop(elRef);
  const fittingItems = Math.round(heightFromTop / 100);

  const membersFetchedFromBackend: FetchedMembers = [
    { memberId: "0f0fa971-f188-4694-90dc-54d7c8a99d87", value: "user1" },
    { memberId: "aebebf70-a962-4885-9be4-4e10ecc147e6", value: "Io" },
  ];

  const memberProps: string[] = ["participant", "payer", "sender", "receiver"];

  // Create new array with additional properties
  const enhancedMembersWithProps: EnhancedMembersWithProps =
    membersFetchedFromBackend.flatMap((member) =>
      memberProps.map((prop) => ({
        ...member,
        prop,
      }))
    );

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
    [
      "transactions",
      "active",
      params.groupid as string,
      payersIds.value,
      participantsIds.value,
      keyWords.value,
    ],
    ({ pageParam }) =>
      api.getGroupTransactions(
        fittingItems,
        params.groupid as string,
        payersIds.value,
        participantsIds.value,
        {
          pageParam,
        }
      ), //TODO handle case of undefined groupId
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.length > 0) {
          const lastTransaction = lastPage[lastPage.length - 1];
          const { transactionTime } = lastTransaction;
          return transactionTime;
        } else return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
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
        <div className="magnifyingGlass">
          <FaMagnifyingGlass onClick={() => (menu.value = "search")} />
        </div>
        {Object.entries(groupedTransactions).map(
          ([monthYear, transactions]) => (
            <div key={monthYear}>
              <div className="monthYearSticky">
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

      <MenuAnimationBackground menu={menu} />
      <SearchTransactionsAnimation
        menu={menu}
        members={membersFetchedFromBackend}
        enhancedMembersWithProps={enhancedMembersWithProps}
        payersIds={payersIds}
        participantsIds={participantsIds}
        keyWords={keyWords}
      />
    </StyledTransactions>
  );
}
