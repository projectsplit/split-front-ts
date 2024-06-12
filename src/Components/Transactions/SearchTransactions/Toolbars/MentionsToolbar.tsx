import { useBeautifulMentions } from "lexical-beautiful-mentions";
import SearchCategoryButton from "../SearchCategoryButton/SearchCategoryButton";
import { MentionsToolbarProps } from "../../../../interfaces";

const MentionsToolbar: React.FC<MentionsToolbarProps> = ({
  showOptions,
  setShowOptions,
}) => {
  const { insertMention } = useBeautifulMentions();

  return (
    <>
      {showOptions && (
        <div className="categoryButtons">
          <SearchCategoryButton
            onClick={() => {
              insertMention({ trigger: "payer:", value: "" });
              setShowOptions(false);
            }}
            category={"payer"}
            type={"member"}
          />
          <SearchCategoryButton
            onClick={() => {
              insertMention({ trigger: "participant:", value: "" });
              setShowOptions(false);
            }}
            category={"participant"}
            type={"member"}
          />
          <SearchCategoryButton
            onClick={() => insertMention({ trigger: "before:", value: "" })}
            category={"before"}
            type={"date"}
          />
          <SearchCategoryButton
            onClick={() => insertMention({ trigger: "during:", value: "" })}
            category={"during"}
            type={"date"}
          />
          <SearchCategoryButton
            onClick={() => insertMention({ trigger: "after:", value: "" })}
            category={"after"}
            type={"date"}
          />
          <SearchCategoryButton
            onClick={() => insertMention({ trigger: "category:", value: "" })}
            category={"category"}
            type={"label"}
          />
        </div>
      )}
    </>
  );
};

export default MentionsToolbar;
