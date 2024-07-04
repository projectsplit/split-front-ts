import { useEffect, useRef, useState } from "react";
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
import { PreventEnterCommandPlugin } from "./plugins/PreventEnterCommandPlugin";
import { updateMembersMentions } from "./helpers/updateMembersMentions";
import SubmitButton from "../../SubmitButton/SubmitButton";

export default function SearchTransactions({
  menu,
  members,
}: SearchTransactionsProps) {
  const [categories, setCategories] = useState<
    { category: string; value: string }[]
  >([]);
  const [editorStateString, setEditorStateString] = useState<string>();
  const [isEmpty, setIsEmpty] = useState(true);
  const [contentEditableHeight, setContentEditableHeight] = useState<number>(0);
  const contentEditableWrapRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useState<boolean>(true);
  // const [searchItem, setSearchItem] = useState<string>("");

  const [filteredResults, setFilteredResults] = useState<
    {
      value: string;
      [key: string]: BeautifulMentionsItemData;
    }[]
  >([]);

  const mentionItems: Record<string, BeautifulMentionsItem[]> = {};

  mentionItems["payer:"] = [];
  mentionItems["participant:"] = [];
  mentionItems["sender:"] = [];
  mentionItems["receiver:"] = [];

  updateMembersMentions(members, mentionItems);

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

  const payersIds: string[] = [];
  const participantsIds: string[] = [];
  const keyWords: string[] = [];

  function onChange(editorState: EditorState) {
    const searchTerm = editorState.read(() => {
      const root = $getRoot();
      return root.getTextContent();
    });

    const jsonObject = editorState.toJSON().root.children;

    if (isElementNode(jsonObject[0])) {
      const children = jsonObject[0].children;
      const lastTextNode = findLastTextNode(children);

      // console.log(jsonObject[0].children);
      children.map((c) => {
        if (c.trigger === "payer:") payersIds.push(c.data.memberId);
        if (c.trigger === "participant:") participantsIds.push(c.data.memberId);
        if (c.text !== " ") keyWords.push(c.text);
      }); //create a submit button function that will be doing this job. Give editorState as input
      //and save the info in local storage. Dedup memberIds and this way you will avoid undefined in keywords array

      if (lastTextNode) {
        handleInputChange(
          lastTextNode.text.trimStart(),
          setFilteredResults,
          members
        );
      } else {
        console.log("No text node found.");
      }
    } else {
      console.log(
        "The node is not an element node and does not have children."
      );
    }

    setEditorStateString(searchTerm);
    if (searchTerm === "") {
      setShowOptions(true);
      setIsEmpty(true);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (contentEditableWrapRef.current) {
        setContentEditableHeight(contentEditableWrapRef.current.offsetHeight);
      }
    };

    handleResize(); // Set initial height

    // Optional: Add a resize observer to handle dynamic changes
    const resizeObserver = new ResizeObserver(handleResize);
    if (contentEditableWrapRef.current) {
      resizeObserver.observe(contentEditableWrapRef.current);
    }

    return () => {
      if (contentEditableWrapRef.current) {
        resizeObserver.unobserve(contentEditableWrapRef.current);
      }
    };
  }, []);
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
              contentEditable={
                <div
                  ref={contentEditableWrapRef}
                  className="contentEditableWrap"
                >
                  <ContentEditable className="contentEditable" />
                </div>
              }
              placeholder={
                isEmpty ? (
                  <div className="contentEditablePlaceholder">Search</div>
                ) : null
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={onChange} />
            <BeautifulMentionsPlugin
              items={mentionItems}
              menuComponent={(props) => (
                <Menu
                  {...props}
                  contentEditableHeight={contentEditableHeight}
                />
              )}
              menuItemComponent={MenuItem}
              onMenuItemSelect={() => setShowOptions(true)}
              insertOnBlur={false}
              //triggers={alphanumericTriggers}
            />
            {filteredResults.length === 0 || editorStateString === "" ? (
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
            <PreventEnterCommandPlugin />
          </LexicalComposer>
        </div>
      </div>
  
      <div className="submitButton">
        <SubmitButton>Apply filters</SubmitButton>
      </div>
    </StyledSearchTransactions>
  );
  
}
