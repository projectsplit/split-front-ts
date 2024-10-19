import { useState } from "react";
import { MembersPillsDisplayProps } from "../../../../../../interfaces";
import Pill from "../../../../../Pill/Pill";
import { StyledMemberPillsDisplay } from "./MembersPillsDisplay.styled";
import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { FetchedMembers } from "../../../../../../types";

export const MembersPillsDisplay: React.FC<MembersPillsDisplayProps> = ({
  category,
  filteredMembers,
  showOptions,
  submitButtonIsActive
}) => {

  const [showFilteredMembers, setFilteredMembers] = useState<FetchedMembers>(filteredMembers)
  const { insertMention } = useBeautifulMentions();

  const removeFilter = (memberId:string)=>{
    
    const updatedFilteredMembers = showFilteredMembers.filter((member)=>member.memberId!==memberId)
    setFilteredMembers(updatedFilteredMembers)
    submitButtonIsActive.value=true;
  }


//TODO : remove pill when clicked, mutation for removing filter in db, highlight  Apply Filters button 


  return (
    <StyledMemberPillsDisplay>
      <div
        className="category"
        onClick={() => {
          insertMention({ trigger: category + ":", value: "" });
          showOptions.value = false;
          //submitButtonIsActive.value=true;
          console.log("Here1")
        }}
      >
        {category}:
      </div>
      &nbsp;
      <div className="pills" >
        {showFilteredMembers.map((member) => (
          <div key={member.value}>
            <Pill title={member.value} color="#A7A7A7" closeButton={true} onClick={()=>removeFilter(member.memberId)} />
          </div>
        ))}
      </div>
    </StyledMemberPillsDisplay>
  );
};
