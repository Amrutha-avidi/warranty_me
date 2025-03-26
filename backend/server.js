const express = require("express");
const cors = require("cors");
const { getAuthURL, getAccessToken, refreshAccessToken } = require("./googleAuth");
const { uploadLetterToDrive } = require("./googleDrive");
const { convertHtmlToPdf } = require("./convert");


const app = express();
app.use(cors());
app.use(express.json());

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-deployed-frontend.com"
    : "http://localhost:5173";




// //  Redirect to Google Login Page
app.get("/auth/google", (req, res) => {
  const url = getAuthURL();
  res.redirect(url);
});

// //  Handle Google OAuth Callback
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const tokens = await getAccessToken(code);


    res.redirect(`${FRONTEND_URL}/home?token=${tokens.access_token}`);
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(500).send("Authentication failed");
  }
});

// //  Refresh Access Token
app.get("/auth/refresh", async (req, res) => {
  try {
    const newAccessToken = await refreshAccessToken();
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

// Upload HTML Content & Save as PDF in Google Drive
app.post("/drive/upload", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "No content provided" });
    }

    //  Convert HTML to PDF
    const pdfPath = await convertHtmlToPdf(content);

    //  Upload to Google Drive
    const fileData = await uploadLetterToDrive(pdfPath);


    res.status(200).json({
      message: "Letter uploaded to Google Drive",
      fileUrl: fileData.webViewLink,
    });
  } catch (error) {
    console.error(" Upload failed:", error);
    res.status(500).json({ error: "Failed to upload letter" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
