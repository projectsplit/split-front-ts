import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchMemberButtonProps } from "../../../../../interfaces";
import { MembersPillsDisplay } from "./MembersPillsDisplay/MembersPillsDisplay";
import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { FetchedMembers } from "../../../../../types";

export default function SearchMemberButton({
  category,
  type,
  members,
  showOptions,
}: SearchMemberButtonProps) {
  
  const { insertMention } = useBeautifulMentions();
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
    <StyledSearchCategoryButton>
      {category === "payer" && payers.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={payers}
          showOptions={showOptions}
        />
      ) : category === "participant" && participants.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={participants}
          showOptions={showOptions}
        />
      ) : category === "sender" && senders.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={senders}
          showOptions={showOptions}
        />
      ) : category === "receiver" && receivers.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={receivers}
          showOptions={showOptions}
        />
      ) : (
        <>
          <div
            className="category"
            onClick={() => {
              insertMention({ trigger: category + ":", value: "" });
              showOptions.value = false;
            }}
          >
            {category}:
          </div>
          &nbsp;
          <div className="type">{type}</div>
        </>
      )}
    </StyledSearchCategoryButton>
  );
}
