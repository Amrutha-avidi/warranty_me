const puppeteer = require("puppeteer");

const convertHtmlToPdf = async (htmlContent) => {
    console.log("Converting HTML to PDF...");

    // Launch Puppeteer
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate PDF as a buffer (no saving to disk)
    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    await browser.close();
    console.log(" PDF successfully generated!");

    return pdfBuffer;
};

module.exports = { convertHtmlToPdf };
