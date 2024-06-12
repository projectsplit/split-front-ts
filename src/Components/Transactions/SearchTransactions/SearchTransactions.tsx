import { useState } from "react";
import { SearchTransactionsProps } from "../../../interfaces";
import { StyledSearchTransactions } from "./SearchTransactions.styled";
import { IoClose } from "react-icons/io5";
import { $getRoot, EditorState } from "lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode } from "@lexical/rich-text";
import {
  BeautifulMentionsPlugin,
  BeautifulMentionNode,
  BeautifulMentionsItem,
  BeautifulMentionsItemData,
} from "lexical-beautiful-mentions";
import { BeautifulMentionsTheme } from "lexical-beautiful-mentions";
import React from "react";
import { OnChangePlugin } from "./plugins/OnChangePlugin";
import { isElementNode } from "./helpers/isElementNode";
import { findLastTextNode } from "./helpers/findLastTextNode";
import { handleInputChange } from "./helpers/handleInputChange";
import { MenuItem } from "./MenuItem/MenuItem";
import { Menu } from "./Menu/Menu";
import MentionsToolbar from "./Toolbars/MentionsToolbar";
import OptionsToolBar from "./Toolbars/OptionsToolbar/OptionsToolBar";

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
    nodes: [HeadingNode, BeautifulMentionNode],
  };

  function onChange(editorState: EditorState) {
    const searchTerm = editorState.read(() => {
      const root = $getRoot();

      return root.getTextContent();
    });

    const jsonObject = editorState.toJSON().root.children;

    if (isElementNode(jsonObject[0])) {
      const children = jsonObject[0].children;
      const lastTextNode = findLastTextNode(children);

      if (lastTextNode) {
        handleInputChange(
          lastTextNode.text.trimStart(),
          setFilteredResults,
          allNames
        );
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
            <RichTextPlugin
              contentEditable={<ContentEditable className="contentEditable" />}
              placeholder={
                <div className="contentEditablePlaceholder">Search</div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={onChange} />
            <BeautifulMentionsPlugin // 👈 add the mentions plugin
              items={mentionItems}
              menuComponent={Menu}
              menuItemComponent={MenuItem}
              onMenuItemSelect={() => setShowOptions(true)}
              insertOnBlur={false}
              //triggers={alphanumericTriggers}
            />
            {filteredResults.length === 0 ||editorStateString === "" ? (
              <MentionsToolbar
                showOptions={showOptions}
                setShowOptions={setShowOptions}
              />
            ) : (
              <OptionsToolBar
                editorStateString={editorStateString}
                filteredResults={filteredResults}
                setFilteredResults={setFilteredResults}
              />
            )}

            <AutoFocusPlugin />
          </LexicalComposer>
        </div>
      </div>
    </StyledSearchTransactions>
  );
}
