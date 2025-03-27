import React from "react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHighlighter,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUnderline,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    
    {
      action: () => editor.chain().focus().toggleBold().run(),
      icon: <FaBold />,
      isActive: editor.isActive("bold"),
      label: "Bold",
    },
    {
      action: () => editor.chain().focus().toggleItalic().run(),
      icon: <FaItalic />,
      isActive: editor.isActive("italic"),
      label: "Italic",
    },
    {
      action: () => editor.chain().focus().toggleStrike().run(),
      icon: <FaStrikethrough />,
      isActive: editor.isActive("strike"),
      label: "Strike",
    },
    {
      action: () => editor.chain().focus().toggleUnderline().run(),
      icon: <FaUnderline />,
      isActive: editor.isActive("underline"),
      label: "Underline",
    },
    {
      action: () => editor.chain().focus().toggleHighlight().run(),
      icon: <FaHighlighter />,
      isActive: editor.isActive("highlight"),
      label: "Highlight",
    },
    {
      action: () => editor.chain().focus().setTextAlign("left").run(),
      icon: <FaAlignLeft />,
      isActive: editor.isActive({ textAlign: "left" }),
      label: "Left",
    },
    {
      action: () => editor.chain().focus().setTextAlign("center").run(),
      icon: <FaAlignCenter />,
      isActive: editor.isActive({ textAlign: "center" }),
      label: "Center",
    },
    {
      action: () => editor.chain().focus().setTextAlign("right").run(),
      icon: <FaAlignRight />,
      isActive: editor.isActive({ textAlign: "right" }),
      label: "Right",
    },
    {
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      icon: <FaAlignJustify />,
      isActive: editor.isActive({ textAlign: "justify" }),
      label: "Justify",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 bg-[#ced1df] p-3 rounded-lg shadow-md justify-center border border-[#29366C] mb-1 ">
      {buttons.map(({ action, icon, isActive, label }, index) => (
        <button
          key={index}
          onClick={action}
          className={`p-2 rounded flex items-center justify-center text-[#DCD9FF] transition-all duration-200
                      ${
                        isActive ? "bg-[#8C95D9]" : "bg-[#29366C]"
                      } hover:bg-[#8C95D9]`}
          title={label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;
