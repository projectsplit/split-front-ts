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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { api } from "../../../apis/api";
import { CreateFiltersRequest } from "../../../types";
import useGroupFilters from "../../../hooks/useGroupFilters";
import Spinner from "../../Spinner/Spinner";

export default function SearchTransactions({
  menu,
  members,
  enhancedMembersWithProps,
}: SearchTransactionsProps) {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [editorStateString, setEditorStateString] = useState<string>();
  const [isEmpty, setIsEmpty] = useState(true);
  const [contentEditableHeight, setContentEditableHeight] = useState<number>(0);
  const submitFiltersErrors = useSignal<any[]>([]);
  const contentEditableWrapRef = useRef<HTMLDivElement>(null);
  const submitButtonIsActive = useSignal<boolean>(false);
  // const tempPayersIds = useSignal<string[]>([]);
  // const tempParticipantsIds = useSignal<string[]>([]);
  // const tempKeyWords = useSignal<string[]>([]);
  const params = useParams();
  const { isFetching, data: groupFiltersData, error }= useGroupFilters(params.groupid);

  const filterState = useSignal<CreateFiltersRequest>({
    groupId: "",
    participantsIds: [],
    payersIds:[],
    receiversIds: [],
    sendersIds: [],
    description:[],
    before: undefined,
    after: undefined,
  });

  const queryClient = useQueryClient();
  
  const showOptions = useSignal<boolean>(true);

  const [filteredResults, setFilteredResults] = useState<
    {
      value: string;
      [key: string]: BeautifulMentionsItemData;
    }[]
  >([]);

  useEffect(() => {
    if (groupFiltersData) {
      filterState.value = {
        groupId: params.groupid || "",
        participantsIds: groupFiltersData.participants?.map(participant => participant.memberId) || [],
        payersIds: groupFiltersData.payers?.map(payer => payer.memberId) || [],
        receiversIds: groupFiltersData.receivers?.map(receiver => receiver.memberId) || [],
        sendersIds: groupFiltersData.senders?.map(sender => sender.memberId) || [],
        description: [],  
        before: undefined,  
        after: undefined,   
      };
    }
  }, [groupFiltersData, params.groupid]);

  useEffect(() => {
    const handleResize = () => {
      filterState.value.groupId = params.groupid as string;
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

  const payers = groupFiltersData?.payers;
  const participants = groupFiltersData?.participants;
  const senders = groupFiltersData?.senders;
  const receivers = groupFiltersData?.receivers;

  const filteredMembers = {
    payers: payers ?? [],
    participants: participants ?? [],
    senders: senders ?? [],
    receivers: receivers ?? [],
  };

  const submitFilters = useMutation<any, any, CreateFiltersRequest>({
    mutationFn: api.submitFilters,
    onError: (error) => {
      submitFiltersErrors.value = error.response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries([
        "transactions",
        "active",
        params.groupid as string,
      ]);
    },
  });

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
      }

      const excludedTerms = [
        "payer:",
        "participant:",
        "sender:",
        "receiver:",
        "before:",
        "during:",
        "after:",
        "category:",
      ];
      const trimmedSearchTerm = searchTerm.trim(); //used to treat all empty spaces the same. e.g. "" ," ", "  "
      if (
        trimmedSearchTerm !== "" &&
        filterState.value.payersIds.length === 0 &&
        !excludedTerms.includes(trimmedSearchTerm) //TODO issue after filterState introduced. Does not activate Apply filter button
      )
        submitButtonIsActive.value = true;
      if (trimmedSearchTerm === "") submitButtonIsActive.value = false;
    } else {
      console.log(
        "The node is not an element node and does not have children."
      );
    }

    setEditorStateString(searchTerm);
    if (searchTerm === "") {
      showOptions.value = true;
      setIsEmpty(true);
    }
  }

  const handleSubmitButton = (editorState: EditorState | null) => {
    if (editorState === null) return;

    const jsonObject = editorState.toJSON().root.children;

    if (isElementNode(jsonObject[0])) {
      const children = jsonObject[0].children;

      children.map((c) => {
        if (c.trigger === "payer:") filterState.value.payersIds.push(c.data.memberId)//tempPayersIds.value.push(c.data.memberId);
        if (c.trigger === "participant:") filterState.value.participantsIds.push(c.data.memberId)//tempParticipantsIds.value.push(c.data.memberId);
        if (c.text !== " ") filterState.value.description.push(c.text);
      });

      submitFilters.mutate({
        groupId: filterState.value.groupId,
        participantsIds: filterState.value.participantsIds,
        payersIds:filterState.value.payersIds ,
        receiversIds:filterState.value.receiversIds, 
        sendersIds:filterState.value.sendersIds,
        description:filterState.value.description
      });

      queryClient.refetchQueries([
        "transactions",
        "active",
        params.groupid as string,
      ]);
      menu.value = null;
    }
  };

  return (
    <StyledSearchTransactions>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className="header">
            <div className="closeSign" onClick={() => (menu.value = null)}>
              <IoClose />
            </div>
            <div className="searchingIn">
              Searching In:&nbsp;
              <span className="groupName">Tour</span>
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
                  onMenuItemSelect={() => (showOptions.value = true)}
                  insertOnBlur={false}
                />
                {filteredResults.length === 0 || editorStateString === "" ? (
                  <MentionsToolbar
                    showOptions={showOptions}
                    filteredMembers={filteredMembers}
                    submitButtonIsActive={submitButtonIsActive}
                  />
                ) : (
                  <OptionsToolBar
                    editorStateString={editorStateString}
                    filteredResults={filteredResults}
                    setFilteredResults={setFilteredResults}
                    submitButtonIsActive={submitButtonIsActive}
                  />
                )}
                <AutoFocusPlugin />
                <PreventEnterCommandPlugin />
              </LexicalComposer>
            </div>
          </div>

          <div className="submitButton">
            <SubmitButton
              onClick={() => handleSubmitButton(editorState)}
              submitButtonIsActive={submitButtonIsActive}
            >
              Apply filters
            </SubmitButton>
          </div>
        </>
      )}
    </StyledSearchTransactions>
  );
}
