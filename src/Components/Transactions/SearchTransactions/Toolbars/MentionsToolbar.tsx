import SearchMemberButton from "../SearchCategoryButtons/SearchMemberButton/SearchMemberButton";
import { MentionsToolbarProps } from "../../../../interfaces";
import SearchDateButton from "../SearchCategoryButtons/SearchDateButton/SearchDateButton";
import SearchLabelButton from "../SearchCategoryButtons/SearchLabelButton/SearchLabelButton";

const MentionsToolbar: React.FC<MentionsToolbarProps> = ({
  showOptions,
  members,
  submitButtonIsActive
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
            submitButtonIsActive={submitButtonIsActive}
            
          />
          <SearchMemberButton
          showOptions={showOptions}
            category={"participant"}
            type={"member"}
            members={members}
            submitButtonIsActive={submitButtonIsActive}
          />
          <SearchMemberButton
          showOptions={showOptions}
            category={"sender"}
            type={"member"}
            members={members}
            submitButtonIsActive={submitButtonIsActive}
          />
          <SearchMemberButton
          showOptions={showOptions}
            category={"receiver"}
            type={"member"}
            members={members}
            submitButtonIsActive={submitButtonIsActive}
          />
          <SearchDateButton
            category={"before"}
            type={"date"}
            dates={""}
            submitButtonIsActive={submitButtonIsActive}
          />
          <SearchDateButton
            category={"during"}
            type={"date"}
            dates={""}
            submitButtonIsActive={submitButtonIsActive}
          />
          <SearchDateButton
            category={"after"}
            type={"date"}
            dates={""}
            submitButtonIsActive={submitButtonIsActive}
          />
          <SearchLabelButton
            category={"category"}
            type={"label"}
            labels={""}
            submitButtonIsActive={submitButtonIsActive}
          />
        </div>
      )}
    </>
  );
};

export default MentionsToolbar;
