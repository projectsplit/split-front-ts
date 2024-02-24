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
    ["transactions", "active", params.groupid as string],
    ({ pageParam }) => api.getGroupTransactions(fittingItems, params.groupid as string, { pageParam }),//TODO handle case of undefined groupId
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
      enabled: true
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const target = event.target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } =
        target

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
    }
  }, [fetchNextPage, hasNextPage]);

  console.log(data?.pages.flatMap((page) => page))
  return (
    <StyledTransactions ref={elRef}>
      <div className="transactionList">
        {isFetching && data === undefined ? (
          <Spinner />
        ) : null}
        {data?.pages.flatMap((page) =>
          page.map((transaction: any) => {
            return (
              transaction?.transfer === null ?
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
                :
                <div key={transaction.transfer.id}>{transaction.transfer.id}</div>
            );
          })
        )}
        {isFetchingNextPage ? <Spinner /> : null}

      </div>
    </StyledTransactions>
  )
}
