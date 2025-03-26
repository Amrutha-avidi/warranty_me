import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

import { loadDrafts, deleteDraft } from "./draftUtils";

const extractSubject = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const h3Elements = doc.querySelectorAll("h3");
    // Look for an h3 tag that includes "Subject"
    for (let h3 of h3Elements) {
        if (h3.textContent.toLowerCase().includes("subject")) {
            return h3.textContent.trim();
        }
    }
    // If not found, return the first h3 (if any)
    if (h3Elements.length > 0) {
        return h3Elements[0].textContent.trim();
    }
    return "No Subject";
}


const SaveDrafts = ({ onDraftSelect, refreshTrigger, onDraftDelete }) => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        const loadedDrafts = loadDrafts();
        setDrafts(loadedDrafts);
    }, [refreshTrigger]); // refreshTrigger prop can force reloading

    return (
        <div className="w-1/3 p-3 bg-[#DCD9FF] border border-[#A3A8C9] rounded-lg flex flex-col gap-2 text-[#29366C]">
            <h2 className="text-2xl underline font-semibold mb-2">Saved Drafts</h2>
            <div className="flex flex-col gap-2 overflow-y-auto">
                {drafts.length === 0 ? (<p className="text-xl text-gray-600">No drafts available.</p>
                ) : (drafts.map((draft) => (
                    <div
                        key={draft.id}
                        onClick={() => onDraftSelect(draft)}
                        className="p-2 bg-[#A3A8C9] rounded hover:bg-[#8C95D9] cursor-pointer text-white text-lg flex justify-between"
                    >
                        {/* Display a preview snippet: for example, the first 50 characters */}
                        {extractSubject(draft.content)}

                        <button className="cursor-pointer border border-gray-100 rounded-b-sm" onClick={(e) => {
                            e.stopPropagation(); // Prevents triggering draft selection
                            deleteDraft(draft.id);
                            onDraftDelete();
                        }}><MdDelete fontSize={25} /></button>
                    </div>
                )))}
            </div>
        </div>
    );
};

export default SaveDrafts;
