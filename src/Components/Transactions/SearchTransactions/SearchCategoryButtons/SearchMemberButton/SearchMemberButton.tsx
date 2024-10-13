import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchMemberButtonProps } from "../../../../../interfaces";
import { MembersPillsDisplay } from "./MembersPillsDisplay/MembersPillsDisplay";
import { useBeautifulMentions } from "lexical-beautiful-mentions";


export default function SearchMemberButton({
  category,
  type,
  members,
  showOptions,
  submitButtonIsActive
}: SearchMemberButtonProps) {
  const { insertMention } = useBeautifulMentions();


  return (
    <StyledSearchCategoryButton>
      {category === "payer" && members.payers.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={members.payers}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
        />
      ) : category === "participant" && members.participants.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={members.participants}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
        />
      ) : category === "sender" && members.senders.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={members.senders}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
        />
      ) : category === "receiver" && members.receivers.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          members={members.receivers}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
        />
      ) : (
        <>
          <div
            className="category"
            onClick={() => {
              insertMention({ trigger: category + ":", value: "" });
              showOptions.value = false;
              //submitButtonIsActive.value=true;
              console.log("Here3")
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
