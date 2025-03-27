require("dotenv").config();

const { google } = require("googleapis");


const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, "base64").toString("utf-8"));


const { client_id, client_secret, redirect_uris } = credentials.web;
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DEPLOYED_BACKEND_URL + "/auth/google/callback"
    : redirect_uris[0];

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

const getAuthURL = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "online",
    scope: ["https://www.googleapis.com/auth/drive.file"],
    prompt: "consent", // Ensures we get a refresh token
  });
};

//  Get Access Token using OAuth Code
const getAccessToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};


module.exports = { getAuthURL, getAccessToken, oauth2Client };
