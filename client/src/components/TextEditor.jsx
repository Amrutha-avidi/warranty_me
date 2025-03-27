import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import defaultContent from "./defaultContent";
import MenuBar from "./Menubar";
import SaveButtons from "./SaveButtons";
import { saveDraft } from "./draftUtils";

const TextEditor = ({ onDraftSaved, selectedDraft, onLoadDraft }) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Strike,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      if (selectedDraft) {
        editor.commands.setContent(selectedDraft.content);
        setContent(selectedDraft.content);
      } else {
        editor.commands.setContent(defaultContent);
        setContent(defaultContent);
      }
    }
  }, [editor, selectedDraft]);

  if (!editor) return null;

  // Stub functions – replace these with your actual logic
  const handleSaveToDrive = async () => {
    console.log("Saving to Drive...");

    try {
      const response = await fetch("https://warranty-me.onrender.com/drive/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const result = await response.json();
      console.log(" Drive Response:", result);
      alert("Successfully uploaded to Google Drive!"); // User feedback
    } catch (error) {
      console.error(" Upload failed:", error);
      alert("Failed to upload to Drive. Please try again.");
    }
  };


  const handleSaveToDrafts = () => {
    const draft = {
      id: Date.now(),
      content: editor.getHTML(),
      savedAt: new Date().toISOString(),
    };
    saveDraft(draft);
    if (onDraftSaved) {
      onDraftSaved();
    }
    console.log("Draft saved!", draft);
    //resetting
    editor.commands.setContent(defaultContent);
    setContent(defaultContent);
  };


  return (
    <div className="flex gap-6">
      {/* Left Section: Editor */}
      <div className="w-2/5 flex flex-col">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="custom-preview-container p-3 rounded-lg min-h-[400px] bg-[#ced1df] text-[#29366C] border border-[#29366C] flex-grow"
        />
        {/* Action Buttons */}
        <SaveButtons
          handleSaveToDrive={handleSaveToDrive}
          handleSaveToDrafts={handleSaveToDrafts}
        />
      </div>

      {/* Middle Section: Live Preview */}
      <div className="w-2/5 p-3 bg-[#ced1df] border border-[#29366C] rounded-lg overflow-y-auto text-[#29366C]">
        <h1 className="text-2xl underline font-semibold mb-2">Preview</h1>
        <div
          className="custom-preview-container"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
