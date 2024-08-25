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
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SearchTransactions({
  menu,
  members,
  enhancedMembersWithProps,
  payersIds,
  participantsIds,
  keyWords
}: SearchTransactionsProps) {

  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [editorStateString, setEditorStateString] = useState<string>();
  const [isEmpty, setIsEmpty] = useState(true);
  const [contentEditableHeight, setContentEditableHeight] = useState<number>(0);
  const contentEditableWrapRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const params = useParams();
  const [showOptions, setShowOptions] = useState<boolean>(true);

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

  const tempPayersIds: string[] = [];
  const tempParticipantsIds: string[] = [];
  const tempKeyWords: string[] = [];

  function onChange(editorState: EditorState) {
    setEditorState(editorState);
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
          enhancedMembersWithProps
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

  const deduplicateStringArray = (array: string[]): string[] => {
    return [...new Set(array)];
  };
  
  const handleSubmitButton = (editorState: EditorState| null) => {
    if (editorState === null) return;
    
    const jsonObject = editorState.toJSON().root.children;

    if (isElementNode(jsonObject[0])) {
      const children = jsonObject[0].children;
      children.map((c) => {
        if (c.trigger === "payer:") tempPayersIds.push(c.data.memberId);
        if (c.trigger === "participant:") tempParticipantsIds.push(c.data.memberId);
        if (c.text !== " ") tempKeyWords.push(c.text);
      }); 

      //console.log("before",filters.value.payersIds,filters.value.participantsIds,filters.value.keyWords)
      
      payersIds.value = deduplicateStringArray(tempPayersIds);
      participantsIds.value =deduplicateStringArray(tempParticipantsIds);
      keyWords.value =deduplicateStringArray(tempKeyWords);
      
      //console.log("after", payersIds.value,participantsIds.value,keyWords.value)

      localStorage.setItem("payersIds",JSON.stringify(tempPayersIds));
      localStorage.setItem("participantsIds",JSON.stringify(tempParticipantsIds));
      localStorage.setItem("keyWords", JSON.stringify(tempKeyWords));

      queryClient.refetchQueries(["transactions", "active", params.groupid as string,payersIds.value,participantsIds.value,keyWords.value])
      menu.value = null
    }
  };

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
                members={members}
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
        <SubmitButton onClick={() => handleSubmitButton(editorState)}>
          Apply filters
        </SubmitButton>
      </div>
    </StyledSearchTransactions>
  );
}
