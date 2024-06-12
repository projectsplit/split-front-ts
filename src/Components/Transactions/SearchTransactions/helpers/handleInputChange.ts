import { BeautifulMentionsItemData } from "lexical-beautiful-mentions";
import { allNames } from "../../../../types";

export const handleInputChange = (searchTerm: string,setFilteredResults: React.Dispatch<React.SetStateAction<{
    [key: string]: BeautifulMentionsItemData;
    value: string;
}[]>>, allNames:allNames) => {

    if (!searchTerm) {

      setFilteredResults([]);
      return;
    }

    const filtered = allNames.filter((name) =>
      name.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  };