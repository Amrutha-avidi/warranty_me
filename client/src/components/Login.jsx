import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../utils/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import Info from "./Info";



const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseIdToken = await result.user.getIdToken(); // Get the ID token

      if (firebaseIdToken) {
        localStorage.setItem("token", firebaseIdToken);
        window.location.href = "https://warranty-me.onrender.com/auth/google";
        navigate("/home");

      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };


  return (
    <div className="flex h-screen font-[Inter]">
      {/* Left - Login Section (30%) */}
      <div className="w-1/3 flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900 text-center">
            Welcome to <span className="text-blue-600">LetterCraft</span>
          </h2>
          <p className="text-gray-600 text-center mb-6 leading-relaxed text-xl">
            Sign in to create, edit, and store letters effortlessly !!
          </p>
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 text-xl 
            w-full bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg shadow-md transition"
          >
            <FcGoogle size={24} /> Continue with Google
          </button>
        </div>
      </div>

      {/* Right - Information Section (70%) */}
      <Info />
    </div>
  );
};

export default Login; 