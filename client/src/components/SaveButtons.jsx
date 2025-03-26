import React from "react";

const SaveButtons = ({ handleSaveToDrive, handleSaveToDrafts }) => {
  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={handleSaveToDrive}
        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
      >
        Save to Drive
      </button>
      <button
        onClick={handleSaveToDrafts}
        className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition"
      >
        Save to Drafts
      </button>
    </div>
  );
};

export default SaveButtons;
