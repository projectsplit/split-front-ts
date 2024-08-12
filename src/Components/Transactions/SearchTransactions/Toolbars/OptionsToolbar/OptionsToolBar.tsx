import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { OptionsToolbarProps } from "../../../../../interfaces";
import { $getNodeByKey } from "lexical";
import { StyledOptionsToolbar } from "./OptionsToolbar.styled";

const OptionsToolBar = ({
  editorStateString,
  filteredResults,
  setFilteredResults,
}: OptionsToolbarProps) => {
  const { insertMention } = useBeautifulMentions();
  const [editor] = useLexicalComposerContext();


  return (
    <>
      {editorStateString === "" ? (
        <></>
      ) : (
        filteredResults.map((result, index) => (

          <StyledOptionsToolbar key={index}
              onClick={() => {
                editor.update(() => {
                  const nodeMap = editor._editorState._nodeMap;
                  let lastTextNodeKey = null;
                  // Find the last text node in the nodeMap
                  for (let [key, node] of nodeMap.entries()) {
                    if (node.__type === "text") {
                      lastTextNodeKey = key;
                    }
                  }
                  // Remove the last text node
                  if (lastTextNodeKey) {
                    const lastTextNode = $getNodeByKey(lastTextNodeKey);
                    if (lastTextNode) {
                      lastTextNode.remove();
                    }
                  }
                  // Insert the mention
                  insertMention({
                    trigger: result.prop + ":",
                    value: result.value,
                  });
                  setFilteredResults([]);
                });
              }}
             >
              <div className="category">{result.prop}:</div>&nbsp;
              <div className="type">{result.value}</div>
              </StyledOptionsToolbar>
        ))
      )}
    </>
  );
};

export default OptionsToolBar;
