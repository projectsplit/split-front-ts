import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchMemberButtonProps } from "../../../../../interfaces";
import { MembersPillsDisplay } from "./MembersPillsDisplay/MembersPillsDisplay";
import { useBeautifulMentions } from "lexical-beautiful-mentions";


export default function SearchMemberButton({
  category,
  type,
  filteredMembers,
  showOptions,
  submitButtonIsActive
}: SearchMemberButtonProps) {
  const { insertMention } = useBeautifulMentions();


  return (
    <StyledSearchCategoryButton>
      {category === "payer" && filteredMembers.payers.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          filteredMembers={filteredMembers.payers}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
        />
      ) : category === "participant" && filteredMembers.participants.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          filteredMembers={filteredMembers.participants}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
        />
      ) : category === "sender" && filteredMembers.senders.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          filteredMembers={filteredMembers.senders}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
        />
      ) : category === "receiver" && filteredMembers.receivers.length !== 0 ? (
        <MembersPillsDisplay
          category={category}
          filteredMembers={filteredMembers.receivers}
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
