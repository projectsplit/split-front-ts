import { useEffect, useRef, useState } from "react";
import { SearchTransactionsProps } from "../../../interfaces";
import { StyledSearchTransactions } from "./SearchTransactions.styled";
import { IoClose } from "react-icons/io5";
import { $createTextNode, $getRoot, $getSelection, EditorState } from "lexical";

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
import { MentionNode } from "./nodes/MentionNode";

import React from "react";

export default function SearchTransactions({ menu }: SearchTransactionsProps) {
  const [categories, setCategories] = useState<
    { category: string; value: string }[]
  >([]);
  const [editorState, setEditorState] = useState<string>();
  console.log(editorState)
  const insertCategoryInput = (category: string) => {};

  const populateCategoryClick = (categoryValue: string) => {};

  const payers = ["George", "Kristi", "Bibi"];
  const participants = ["George", "Kristi", "Bibi", "Jon", "Conor"];
  const labels = ["food", "drinks", "petrol", "hotel"];

  const theme = {
    text: {
      bold: "editor-bold",
    },
  };

  const onError = (error: Error): void => {
    console.error(error);
  };

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode, MentionNode],
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

  function onChange(editorState: EditorState) {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify

    setEditorState(JSON.stringify(editorStateJSON));
  }

  const MyHeadingPlugin = (): JSX.Element => {
    const [editor] = useLexicalComposerContext();
    const onClick = (e: React.MouseEvent): void => {
      editor.update(() => {
        const root = $getRoot();
        root.append($createHeadingNode("h1").append($createTextNode("Hello")));
      
      });
    };

    return <button onClick={onClick}>Heading</button>;
  };

  const FilterPlugin = (props:{filter:string}): JSX.Element => {
    const [editor] = useLexicalComposerContext();
    const {filter} = props;
    const onClick = (e: React.MouseEvent): void => {
      editor.update(() => {
        const root = $getRoot();
        root.append($createHeadingNode("h1").append($createTextNode("Hello")));
      });
    };

    return <span onClick={onClick}>{filter}</span>;
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
            <PlainTextPlugin
              contentEditable={<ContentEditable className="contentEditable" />}
              placeholder={<div className="contentEditablePlaceholder">Search</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <MyOnChangePlugin onChange={onChange} />
            <MentionsPlugin />
            <FilterPlugin filter="paok" />
          </LexicalComposer>
        </div>

        <div className="searchOptions">
          {/* Render payers if any payer category exists */}
          {categories.some((cat) => cat.category.includes("payer")) && (
            <div className="paok">
              {payers.map((payer, index) => (
                <div onClick={() => populateCategoryClick(payer)} key={index}>
                  {payer}
                </div>
              ))}
            </div>
          )}

          {/* Render participants if any participant category exists */}
          {categories.some((cat) => cat.category.includes("participant")) && (
            <div className="paok">
              {participants.map((participant, index) => (
                <div
                  onClick={() => populateCategoryClick(participant)}
                  key={index}
                >
                  {participant}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="categoryButtons">
          <SearchCategoryButton
            onClick={() => insertCategoryInput("payer")}
            category={"payer"}
            type={"member"}
          />
          <SearchCategoryButton
            onClick={() => insertCategoryInput("participant")}
            category={"participant"}
            type={"member"}
          />
          <SearchCategoryButton
            onClick={() => insertCategoryInput("before")}
            category={"before"}
            type={"date"}
          />
          <SearchCategoryButton
            onClick={() => insertCategoryInput("during")}
            category={"during"}
            type={"date"}
          />
          <SearchCategoryButton
            onClick={() => insertCategoryInput("after")}
            category={"after"}
            type={"date"}
          />
          <SearchCategoryButton
            onClick={() => insertCategoryInput("category")}
            category={"category"}
            type={"label"}
          />
        </div>
      </div>
    </StyledSearchTransactions>
  );
}
