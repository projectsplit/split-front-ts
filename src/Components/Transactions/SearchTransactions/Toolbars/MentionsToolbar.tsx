import SearchMemberButton from "../SearchCategoryButtons/SearchMemberButton/SearchMemberButton";
import { MentionsToolbarProps } from "../../../../interfaces";
import SearchDateButton from "../SearchCategoryButtons/SearchDateButton/SearchDateButton";
import SearchLabelButton from "../SearchCategoryButtons/SearchLabelButton/SearchLabelButton";

const MentionsToolbar: React.FC<MentionsToolbarProps> = ({
  showOptions,
  members,
}) => {

  return (
    <>
      {showOptions.value && (
        <div className="categoryButtons">
          <SearchMemberButton
          showOptions={showOptions}
            category={"payer"}
            type={"member"}
            members={members}
          />
          <SearchMemberButton
          showOptions={showOptions}
            category={"participant"}
            type={"member"}
            members={members}
          />
          <SearchMemberButton
          showOptions={showOptions}
            category={"sender"}
            type={"member"}
            members={members}
          />
          <SearchMemberButton
          showOptions={showOptions}
            category={"receiver"}
            type={"member"}
            members={members}
          />
          <SearchDateButton
            category={"before"}
            type={"date"}
            dates={""}
          />
          <SearchDateButton
            category={"during"}
            type={"date"}
            dates={""}
          />
          <SearchDateButton
            category={"after"}
            type={"date"}
            dates={""}
          />
          <SearchLabelButton
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
