//-------------------------

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Helper function to generate the HTML file
function feedbackHtml() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	// Define the path to the HTML file (make sure user.html exists)
	const filePath = path.join(__dirname, "views", "user.html");

	// Read and return the HTML content
	return fs.readFileSync(filePath, "utf8");
}

export default feedbackHtml;
