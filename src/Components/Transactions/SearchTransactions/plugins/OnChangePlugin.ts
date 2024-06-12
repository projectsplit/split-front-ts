import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";

export  function OnChangePlugin(props: {
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