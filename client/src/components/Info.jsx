import React from 'react'
import { MdOutlineSaveAlt } from "react-icons/md";
import {FaPencilAlt, FaGoogleDrive,FaSignInAlt } from "react-icons/fa";

const Info = () => {
  return (
    <div className="w-2/3 flex flex-col justify-center px-16 bg-gradient-to-r from-blue-500 to-blue-300 text-white">
    <h2 className="text-5xl font-bold mb-6 leading-snug">
      Effortless Letter Creation & Storage
    </h2>
    <p className="text-lg text-gray-200 mb-8 leading-relaxed">
      Craft professional letters, save drafts, and sync effortlessly with Google Drive.
    </p>
    <ul className="space-y-4">
      <li className="flex items-center gap-2 text-xl">
        <FaPencilAlt /> <span>Write & format letters with ease.</span>
      </li>
      <li className="flex items-center gap-2 text-xl">
        <MdOutlineSaveAlt /> <span>Save drafts securely before uploading.</span>
      </li>
      <li className="flex items-center gap-2 text-xl">
        <FaGoogleDrive /> <span>Sync letters with Google Drive for access anywhere.</span>
      </li>
      <li className="flex items-center gap-2 text-xl">
        <FaSignInAlt/> <span>Secure authentication with Google Sign-In.</span>
      </li>
    </ul>
  </div>
  )
}

export default Info