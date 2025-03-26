require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, "base64").toString("utf-8"));


const { client_id, client_secret, redirect_uris } = credentials.web;
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DEPLOYED_BACKEND_URL + "/auth/google/callback"
    : redirect_uris[0];

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

//  Path to store refresh token
const TOKEN_PATH = path.join(__dirname, "tokens.json");

//  Load existing refresh token if available
const loadTokens = () => {
  if (fs.existsSync(TOKEN_PATH)) {
    const storedTokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
    oauth2Client.setCredentials(storedTokens);
    console.log("Loaded existing tokens");
  }
};

// Save refresh token to a file
const saveTokens = (tokens) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log("Tokens saved to file");
};

//  Generate Google Auth URL
const getAuthURL = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"],
    prompt: "consent", // Ensures we get a refresh token
  });
};

//  Get Access Token using OAuth Code
const getAccessToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  if (tokens.refresh_token) {
    saveTokens(tokens); // Save refresh token if provided
  }

  return tokens;
};

//  Refresh Access Token
const refreshAccessToken = async () => {
  if (!oauth2Client.credentials.refresh_token) {
    throw new Error("No refresh token stored!");
  }

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);
    saveTokens(credentials);
    console.log("Access token refreshed");
    return credentials.access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

// Load tokens on startup
loadTokens();

module.exports = { getAuthURL, getAccessToken, refreshAccessToken, oauth2Client };
