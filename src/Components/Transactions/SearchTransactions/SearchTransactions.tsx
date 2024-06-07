import { CSSProperties, forwardRef, useEffect, useRef, useState } from "react";
import { SearchTransactionsProps } from "../../../interfaces";
import { StyledSearchTransactions } from "./SearchTransactions.styled";
import { IoClose } from "react-icons/io5";
import {
  $createTextNode,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $nodesOfType,
  EditorState,
  TextNode,
 
} from "lexical";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import SearchCategoryButton from "./SearchCategoryButton/SearchCategoryButton";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";
import MentionsPlugin from "./plugins/MentionsPlugin";
import { MentionNode, $createMentionNode } from "./nodes/MentionNode";
import { $createParagraphNode } from "lexical";
import {
  BeautifulMentionsPlugin,
  BeautifulMentionNode,
  useBeautifulMentions,
  BeautifulMentionsMenuProps,
  BeautifulMentionsMenuItemProps,
  BeautifulMentionsItem,
  BeautifulMentionsItemData,
} from "lexical-beautiful-mentions";
import { BeautifulMentionsTheme } from "lexical-beautiful-mentions";
import React from "react";
import styled from "styled-components";

interface StyledMenuItemProps {
  selected?: boolean;
}

const List = styled.ul`
  margin: 0;
  min-width: 18rem;
  overflow: hidden;
  padding: 0.25rem;
  scrollbar-width: none;
  position: fixed; /* Add fixed position */
  top: 20%; /* Adjust as necessary */
  left: 50%; /* Adjust as necessary */
  transform: translateX(-50%); /* Center horizontally */
  background-color: white; /* Add background color */
  z-index: 1000; /* Ensure it is above other elements */
  border: 1px solid #ccc; /* Optional border for visibility */
  border-radius: 0.375rem; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledMenuItem = styled.li<StyledMenuItemProps>`
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  border-radius: 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 1.875rem;
  outline: none;
  background-color: ${({ selected }) => (selected ? "blue" : "transparent")};
  color: ${({ selected }) => (selected ? "white" : "inherit")};
`;

export default function SearchTransactions({ menu }: SearchTransactionsProps) {
  const [categories, setCategories] = useState<
    { category: string; value: string }[]
  >([]);
  const [editorStateString, setEditorStateString] = useState<string>();

  const [showOptions, setShowOptions] = useState<boolean>(true);
  // const [searchItem, setSearchItem] = useState<string>("");
  const allNames = [
    { value: "George", id: 30, prop: "payer" },
    { value: "Kristi", id: 31, prop: "payer" },
    { value: "Bibi", id: 32, prop: "payer" },
    { value: "Alice", id: 33, prop: "participant" },
    { value: "Bob", id: 34, prop: "participant" },
    { value: "Charlie", id: 35, prop: "participant" },
  ];
  const [filteredResults, setFilteredResults] = useState<
    {
      value: string;
      [key: string]: BeautifulMentionsItemData;
    }[]
  >([]);

  const mentionItems: Record<string, BeautifulMentionsItem[]> = {};

  mentionItems["payer:"] = [
    { value: "George", id: 30, prop: "payer" },
    { value: "Kristi", id: 31, prop: "payer" },
    { value: "Bibi", id: 32, prop: "payer" },
  ];
  mentionItems["participant:"] = [
    { value: "Alice", id: 33, prop: "participant" },
    { value: "Bob", id: 34, prop: "participant" },
    { value: "Charlie", id: 35, prop: "participant" },
  ];

  const beautifulMentionsTheme: BeautifulMentionsTheme = {
    "payer:": {
      trigger: "trigger",
      value: "value",
      container: "container",
      containerFocused: "containerFocused",
    },
    "participant:": {
      trigger: "trigger",
      value: "value",
      container: "container",
      containerFocused: "containerFocused",
    },
  };

  const theme = {
    text: {
      bold: "editor-bold",
    },
    beautifulMentions: beautifulMentionsTheme,
  };

  const onError = (error: Error): void => {
    console.error(error);
  };

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode, MentionNode, BeautifulMentionNode],
  };

  function MyOnChangePlugin(props: {
    onChange: (editorState: EditorState) => void;
  }): null {
    // Access the editor through the LexicalComposerContext
    const [editor] = useLexicalComposerContext();
    const { onChange } = props;
    // Wrap our listener in useEffect to handle the teardown and avoid stale references.
    useEffect(() => {
      // most listeners return a teardown function that can be called to clean them up.
      return editor.registerUpdateListener(({ editorState }) => {
        // call onChange here to pass the latest state up to the parent.
        onChange(editorState);
      });
    }, [editor, onChange]);

    return null;
  }

  type SerializedLexicalNode = {
    type: string;
    [key: string]: any;
  };

  type SerializedElementNode = SerializedLexicalNode & {
    children: SerializedLexicalNode[];
  };

  function isElementNode(node: SerializedLexicalNode ): node is SerializedElementNode {
    return "children" in node;
  }

  function findLastTextNode(
    children: SerializedLexicalNode[]
  ): SerializedLexicalNode | null {
    for (let i = children.length - 1; i >= 0; i--) {
      if (children[i].type === "text") {
        return children[i];
      }
    }
    return null;
  }

  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();

    const searchTerm = editorState.read(() => {
      const root = $getRoot();

      return root.getTextContent();
    });

    const jsonObject = editorState.toJSON().root.children;
    console.log(jsonObject)
    if (isElementNode(jsonObject[0])) {
      const children = jsonObject[0].children;
      const lastTextNode = findLastTextNode(children);
      if (lastTextNode) {
        handleInputChange(lastTextNode.text.trimStart());
      } else {
        console.log("No text node found.");
      }
    } else {
      console.log(
        "The node is not an element node and does not have children."
      );
    }

    //handleInputChange(searchTerm);
    //setEditorState(JSON.stringify(editorStateJSON));
    setEditorStateString(searchTerm);
  }


  const MenuItem = React.forwardRef<
    HTMLLIElement,
    BeautifulMentionsMenuItemProps
  >(({ selected, ...props }, ref) => {
    return <StyledMenuItem ref={ref} selected={selected} {...props} />;
  });

  const Menu = React.forwardRef<any, BeautifulMentionsMenuProps>(
    ({ open, ...other }, ref) => {
      return <List ref={ref} {...other} />;
    }
  );

  const MentionsToolbar = () => {
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


  // onClick={() => {
  //   editor.update(() => {
  //     const root = $getRoot();
  //     root.clear();
  //     insertMention({
  //       trigger: result.prop + ":",
  //       value: result.value,
  //     });
  //   });
  // }}


  const OptionsToolBar = () => {
    const { insertMention } = useBeautifulMentions();
    const[editor] = useLexicalComposerContext();

    console.log(editor._editorState._nodeMap.entries())
    return (
      <>
        {editorStateString === "" ? (
          <></>
        ) : (
          filteredResults.map((result, index) => (
            <div key={index}>
              <div
                className="result"
                style={{ display: "flex", flexDirection: "row" }}
                onClick={() => {
                  editor.update(() => {
                    const nodeMap = editor._editorState._nodeMap;
                    let lastTextNodeKey = null;
    
                    // Find the last text node in the nodeMap
                    for (let [key, node] of nodeMap.entries()) {
                      if (node.__type === 'text') {
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
                  });
                }}
              >
                <div className="resultDescr">{result.prop}:</div>
                <div className="resultDescr">{result.value}</div>
              </div>
            </div>
          ))
        )}
      </>
    );
  };

  const handleInputChange = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredResults([]);
      return;
    }

    const filtered = allNames.filter((name) =>
      name.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <StyledSearchTransactions>
      <div className="header">
        <div className="closeSign" onClick={() => (menu.value = null)}>
          <IoClose />
        </div>
        <div className="searchingIn">
          Searching In:&nbsp;
          <span className="groupName">Tour </span>
        </div>
        <div className="gap"></div>
      </div>

      <div className="searchBarAndCategories">
        <div className="lexicalSearch">
          <LexicalComposer initialConfig={initialConfig}>
            {/* <MyHeadingPlugin /> */}
            <RichTextPlugin
              contentEditable={<ContentEditable className="contentEditable" />}
              placeholder={
                <div className="contentEditablePlaceholder">Search</div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <MyOnChangePlugin onChange={onChange} />
            {/* <MentionsPlugin /> */}
            <BeautifulMentionsPlugin // 👈 add the mentions plugin
              items={mentionItems}
              menuComponent={Menu}
              menuItemComponent={MenuItem}
              onMenuItemSelect={() => setShowOptions(true)}
              insertOnBlur={false}
              //triggers={alphanumericTriggers}
            />
            <MentionsToolbar />
            <OptionsToolBar />
            <AutoFocusPlugin />
          </LexicalComposer>
        </div>
      </div>
    </StyledSearchTransactions>
  );
}