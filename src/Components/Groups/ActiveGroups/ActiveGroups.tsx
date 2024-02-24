import React, { useRef } from "react";
import TreeAdjustedContainer from "../../TreeAdjustedContainer/TreeAdjustedContainer";
import { StyledActiveGroups } from "./ActiveGroups.styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../apis/api";
import { useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import { TreeItemBuilder } from "../../../helpers/TreeItemBuilder";
import { useNavigate } from "react-router-dom";
import { calculateDistanceFromTop } from "../../../helpers/calculateDistanceFromTop";

export default function ActiveGroups() {
  const elRef = useRef<HTMLDivElement>(null);
  const heightFromTop = window.innerHeight - calculateDistanceFromTop(elRef); //(58 + 36 + 18 + 4 + 30)
  const fittingItems = Math.round(heightFromTop / 81);
  const navigate = useNavigate();

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
    ["groups", "active"],
    ({ pageParam }) => api.getUserGroups(fittingItems, { pageParam }),
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.length > 0) {
          const lastGroupAndPendingTransactions = lastPage[lastPage.length - 1];
          const { creationTime } = lastGroupAndPendingTransactions.group;
          return creationTime;
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


  return (
    <StyledActiveGroups ref={elRef}>
      <div className="groupList">
        {isFetching && data === undefined ? (
          <Spinner />
        ) : null}
        {data?.pages.flatMap((page) =>
          page.map((element: any) => {
            return (
              <div key={element.group.id}>
                <TreeAdjustedContainer
                  onClick={() => navigate(`/groups/active/${element.group.id}/transactions`)}
                  hasarrow={true}
                  items={TreeItemBuilder(element.pendingTransactions)}
                >
                  <div className="groupName">{element.group.title}</div>
                </TreeAdjustedContainer>
              </div>
            );
          })
        )}
        {isFetchingNextPage ? <Spinner /> : null}
      </div>
    </StyledActiveGroups>
  );
}
