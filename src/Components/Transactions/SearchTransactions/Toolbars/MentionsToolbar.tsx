import { useBeautifulMentions } from "lexical-beautiful-mentions";
import SearchMemberButton from "../SearchCategoryButtons/SearchMemberButton/SearchMemberButton";
import { MentionsToolbarProps } from "../../../../interfaces";
import SearchDateButton from "../SearchCategoryButtons/SearchDateButton/SearchDateButton";
import SearchLabelButton from "../SearchCategoryButtons/SearchLabelButton/SearchLabelButton";

const MentionsToolbar: React.FC<MentionsToolbarProps> = ({
  showOptions,
  setShowOptions,
  members
}) => {
  const { insertMention } = useBeautifulMentions();

  return (
    <>
      {showOptions && (
        <div className="categoryButtons">
          <SearchMemberButton
            onClick={() => {
              insertMention({ trigger: "payer:", value: "" });
              setShowOptions(false);
            }}
            category={"payer"}
            type={"member"}
            members={members}
          />
          <SearchMemberButton
            onClick={() => {
              insertMention({ trigger: "participant:", value: "" });
              setShowOptions(false);
            }}
            category={"participant"}
            type={"member"}
            members={members}
          />
           <SearchMemberButton
            onClick={() => {
              insertMention({ trigger: "sender:", value: "" });
              setShowOptions(false);
            }}
            category={"sender"}
            type={"member"}
            members={members}
          />
            <SearchMemberButton
            onClick={() => {
              insertMention({ trigger: "receiver:", value: "" });
              setShowOptions(false);
            }}
            category={"receiver"}
            type={"member"}
            members={members}
          />
          <SearchDateButton
            onClick={() => insertMention({ trigger: "before:", value: "" })}
            category={"before"}
            type={"date"}
            dates={""}
          />
          <SearchDateButton
            onClick={() => insertMention({ trigger: "during:", value: "" })}
            category={"during"}
            type={"date"}
            dates={""}
          />
          <SearchDateButton
            onClick={() => insertMention({ trigger: "after:", value: "" })}
            category={"after"}
            type={"date"}
            dates={""}
          />
          <SearchLabelButton
            onClick={() => insertMention({ trigger: "category:", value: "" })}
            category={"category"}
            type={"label"}
            labels={""}
          />
        </div>
      )}
    </>
  );
};

export default MentionsToolbar;
