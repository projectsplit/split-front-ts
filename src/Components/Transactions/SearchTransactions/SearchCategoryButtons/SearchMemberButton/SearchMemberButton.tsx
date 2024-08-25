import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchMemberButtonProps } from "../../../../../interfaces";
import { MembersPillsDisplay } from "./MembersPillsDisplay/MembersPillsDisplay";
import { FetchedMembers } from "../../../../../types";

export default function SearchMemberButton({
  category,
  type,
  onClick,
  members,
}: SearchMemberButtonProps) {
  //here we need to check local storage and build pills with the names of each category e.g. participant payer etc.
  const participantIds: string[] = JSON.parse(
    localStorage.getItem("participantsIds") || "[]"
  );
  const payerIds: string[] = JSON.parse(
    localStorage.getItem("payersIds") || "[]"
  );

  // Filter members based on the IDs
  const participants = members.filter((member) =>
    participantIds.includes(member.memberId)
  );
  const payers = members.filter((member) => payerIds.includes(member.memberId));
  const senders: FetchedMembers = [];
  const receivers: FetchedMembers = [];

  return (
    <StyledSearchCategoryButton onClick={onClick}>
      {category === "payer" && payers.length !== 0 ? (
        <MembersPillsDisplay category={category} members={payers} />
      ) : category === "participant" && participants.length !== 0 ? (
        <MembersPillsDisplay category={category} members={participants} />
      ) : category === "sender" && senders.length !== 0 ? (
        <MembersPillsDisplay category={category} members={senders} />
      ) : category === "receiver" && receivers.length !== 0 ? (
        <MembersPillsDisplay category={category} members={receivers} />
      ) : (
        <>
          <div className="category">{category}:</div>&nbsp;
          <div className="type">{type}</div>
        </>
      )}
    </StyledSearchCategoryButton>
  );
}
