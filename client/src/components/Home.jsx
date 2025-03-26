import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import TextEditor from "./TextEditor";
import SaveDrafts from "./SaveDrafts";

const Home = () => {
  const [user, setUser] = useState(null);
  const [draftRefresh, setDraftRefresh] = useState(0); // To trigger reload of drafts
  const [selectedDraft, setSelectedDraft] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/"); // Redirect to login if not logged in
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Callback to refresh drafts when a new one is saved
  const handleDraftSaved = () => {
    setDraftRefresh((prev) => prev + 1);
  };

  // When a draft is selected from the list
  const handleDraftSelect = (draft) => {
    setSelectedDraft(draft);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#8C95D9] via-[#A3A8C9] to-[#8C95D9] text-[#29366C] p-10 px-20 font-serif">
      <header className="max-w-8xl mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome to <span className="text-yellow-300 underline">LetterCraft</span>,{" "}
            {user?.displayName || "User"}!
          </h1>
          <p className="text-[#29366C] mb-6 text-xl">
            Create, edit, and store letters effortlessly.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#F3E5AB] hover:bg-[#E3D89D] text-[#29366C] font-medium py-2 px-6 rounded-lg text-lg shadow-lg transition"
        >
          Logout
        </button>
      </header>
      <div className="flex gap-6">
        <TextEditor
          onDraftSaved={handleDraftSaved}
          selectedDraft={selectedDraft}
        />
        <SaveDrafts
          onDraftSelect={handleDraftSelect}
          refreshTrigger={draftRefresh}
          onDraftDelete={() => setDraftRefresh((prev) => prev + 1)} />
      </div>
    </div>
  );
};

export default Home;
