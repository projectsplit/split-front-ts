import React from "react";
import TreeAdjustedContainer from "../../Home/TreeAdjustedContainer/TreeAdjustedContainer";
import { StyledActiveGroups } from "./ActiveGroups.styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../apis/api";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";

export default function ActiveGroups() {
  const items = [
    <div className="groupsInfo">
      <strong>You</strong> are owed <span className="owed">£56.00</span>
    </div>,
    <div className="groupsInfo">
      <strong>You</strong> owe <span className="owe">$5.65</span>
    </div>,
  ];

  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["activeGroups"], api.getUserGroups, {
    getNextPageParam: (lastPage, _pages) => {
      if (lastPage.length > 0) {
        const lastGroup = lastPage[lastPage.length - 1];
        const { creationTime } = lastGroup;
        return creationTime;
      } else return undefined;
    },
  });

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
          page.map((group: any) => {
            return (
              <div key={group.id}>
                <TreeAdjustedContainer
                  onClick={() => console.log("goto group")}
                  hasarrow={true}
                  items={items}
                >
                  <div className="groupName">{group.title}</div>
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
