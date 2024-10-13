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
    isFetchingNextPage,
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

  return (
    <StyledActiveGroups ref={elRef}>
      {isFetching && data === undefined ? <Spinner /> : null}
      <div className="groups">
        {data?.pages.flatMap((page) =>
          page.map((element: any) => {
            return (
              <div key={element.group.id}>
                <TreeAdjustedContainer
                  onClick={() =>
                    navigate(`/groups/active/${element.group.id}/transactions`)
                  }
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
