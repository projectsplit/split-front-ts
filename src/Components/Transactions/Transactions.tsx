import React, { useEffect, useRef } from 'react'
import { StyledTransactions } from './Transactions.styled'
import Expense from './Expense/Expense'
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../../apis/api';
import { useParams } from 'react-router-dom';
import { calculateDistanceFromTop } from '../../helpers/calculateDistanceFromTop';
import Spinner from '../Spinner/Spinner';

export default function Transactions() {
  const params = useParams()
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
    isFetchingNextPage
  } = useInfiniteQuery(
    ["transactions", "active"],
    ({ pageParam }) => api.getGroupTransactions(fittingItems, params.groupid as string, { pageParam }),//TODO handle case of undefined groupId
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.length > 0) {
          const lastTransaction = lastPage[lastPage.length - 1];
          const { transactionTime } = lastTransaction;
          return transactionTime;
        } else return undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.documentElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;

        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  console.log(data?.pages.flatMap((page) => page))
  return (
    <StyledTransactions ref={elRef}>
      <div className="transactionList">
        {isFetching && data === undefined ? (
          <Spinner />
        ) : null}
        {data?.pages.flatMap((page) =>
          page.map((transaction: any, index: number) => {
            return (
              transaction?.transfer === null ?
                <Expense
                  key={index}
                  amount={transaction.expense.amount}
                  creationTime={transaction.expense.creationTime}
                  currency={transaction.expense.currency}
                  description={transaction.expense.description}
                  expenseTime={transaction.expense.expenseTime}
                  lastUpdateTime={transaction.expense.lastUpdateTime}
                  participants={transaction.expense.participants}
                  payers={transaction.expense.payers}
                />
                :
                <div key={index}>transfer</div>
            );
          })
        )}
        {isFetchingNextPage ? <Spinner /> : null}

      </div>
    </StyledTransactions>
  )
}
