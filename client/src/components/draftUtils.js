// draftUtils.js

export const loadDrafts = () => {
    const drafts = localStorage.getItem("drafts");
    return drafts ? JSON.parse(drafts) : [];
  };
  
  export const saveDraft = (draft) => {
    const drafts = loadDrafts();
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));
  };
  
  export const updateDrafts = (newDrafts) => {
    localStorage.setItem("drafts", JSON.stringify(newDrafts));
  };
  
  export const deleteDraft = (draftId) => {
    let drafts = JSON.parse(localStorage.getItem("drafts")) || [];
    drafts = drafts.filter((draft) => draft.id !== draftId);
    localStorage.setItem("drafts", JSON.stringify(drafts));
    return drafts
  };