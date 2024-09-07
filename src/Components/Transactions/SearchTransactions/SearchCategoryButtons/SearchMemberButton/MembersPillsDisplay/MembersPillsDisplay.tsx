import { MembersPillsDisplayProps } from "../../../../../../interfaces";
import Pill from "../../../../../Pill/Pill";
import { StyledMemberPillsDisplay } from "./MembersPillsDisplay.styled";
import { useBeautifulMentions } from "lexical-beautiful-mentions";

export const MembersPillsDisplay: React.FC<MembersPillsDisplayProps> = ({
  category,
  members,
  showOptions,
}) => {

  const { insertMention } = useBeautifulMentions();

  return (
    <StyledMemberPillsDisplay>
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
      <div className="pills">
        {members.map((member) => (
          <div key={member.value}>
            <Pill title={member.value} color="#A7A7A7" closeButton={true} />
          </div>
        ))}
      </div>
    </StyledMemberPillsDisplay>
  );
};
