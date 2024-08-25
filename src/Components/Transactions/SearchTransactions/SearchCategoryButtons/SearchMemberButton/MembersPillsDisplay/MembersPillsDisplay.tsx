import { MembersPillsDisplayProps } from "../../../../../../interfaces";
import Pill from "../../../../../Pill/Pill";
import { StyledMemberPillsDisplay } from "./MembersPillsDisplay.styled";

export const MembersPillsDisplay: React.FC<MembersPillsDisplayProps> = ({
  category,
  members,
}) => {
  return (
    <StyledMemberPillsDisplay>
      <div className="category">{category}:</div>&nbsp;
      <div className="pills">
        {members.map((member) => (
          <div key={member.value}><Pill title={member.value} color='#A7A7A7' closeButton={true} /></div>
        ))}
      </div>
    </StyledMemberPillsDisplay>
  );
};
