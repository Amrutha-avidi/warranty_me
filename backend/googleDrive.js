const { google } = require("googleapis");
const { Readable } = require("stream"); // Import Readable Stream
const oauth2Client = require("./googleAuth").oauth2Client;

const drive = google.drive({ version: "v3", auth: oauth2Client });

/**
 * Convert Buffer to Readable Stream
 */
function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

/**
 * Get or create "Letters" folder in Google Drive.
 */
async function getOrCreateLettersFolder() {
  try {
    const response = await drive.files.list({
      q: "name='Letters' and mimeType='application/vnd.google-apps.folder' and trashed=false",
      fields: "files(id, name)",
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    }

    const folderMetadata = {
      name: "Letters",
      mimeType: "application/vnd.google-apps.folder",
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: "id",
    });

    console.log("'Letters' folder created:", folder.data.id);
    return folder.data.id;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
}

/**
 * Upload PDF buffer to "Letters" folder in Google Drive.
 */
async function uploadLetterToDrive(pdfBuffer) {
  console.log("Uploading file to Google Drive...");

  try {
    const folderId = await getOrCreateLettersFolder();
    
    const fileMetadata = {
      name: "Letter.pdf",
      mimeType: "application/pdf",
      parents: [folderId], // Save inside "Letters" folder
    };

    const media = {
      mimeType: "application/pdf",
      body: bufferToStream(pdfBuffer), // Convert buffer to stream
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    });

    console.log(" File uploaded successfully:", response.data);
    return response.data; 
  } catch (error) {
    console.error(" Google Drive Upload Failed:", error);
    throw error;
  }
}

module.exports = { uploadLetterToDrive };
