import React, { useLayoutEffect } from "react";
import TreeAdjustedContainer from "../../Home/TreeAdjustedContainer/TreeAdjustedContainer";
import { StyledActiveGroups } from "./ActiveGroups.styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../apis/api";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { ItemBuilder } from "../helpers/ItemBuilder";

export default function ActiveGroups() {
  const heightFromTop = window.innerHeight - (58 + 36 + 18 + 4 + 30);
  const fittingItems = Math.round(heightFromTop / 81);

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
    ["activeGroups"],
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
    <StyledActiveGroups>
      <div className="groupList">
        {isFetching && data === undefined ? (
          <CgSpinner className="spinner" />
        ) : null}
        {data?.pages.flatMap((page) =>
          page.map((element: any) => {
            return (
              <div key={element.group.id}>
                <TreeAdjustedContainer
                  onClick={() => console.log("goto group")}
                  hasarrow={true}
                  items={ItemBuilder(element)}
                >
                  <div className="groupName">{element.group.title}</div>
                </TreeAdjustedContainer>
              </div>
            );
          })
        )}
        {isFetchingNextPage ? <CgSpinner className="spinner" /> : null}
      </div>
    </StyledActiveGroups>
  );
}
