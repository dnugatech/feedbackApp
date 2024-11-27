import express from "express";
import pkg from "body-parser";
import feedbackHtml from "./feedback.js";

// Initialize express app and body-parser
const app = express();
const port = 3000;
const localhost = "127.0.0.1";

const { urlencoded, json } = pkg;

// Use body-parser middleware to parse incoming requests
app.use(urlencoded({ extended: true }));
app.use(json());

// Store feedback in-memory (this could be replaced with a database)
let feedbacks = [];

// Serve the feedback form (user.html)
app.get("/", (req, res) => {
	try {
		res.send(feedbackHtml());
	} catch (err) {
		res.status(500).send("Error reading HTML: " + err.message);
	}
});

// Handle the feedback form submission
app.post("/submit-feedback", (req, res) => {
	const { name, feedback } = req.body;
	feedbacks.push({ name, feedback });
	res.redirect("/view-feedback");
});

// Display the submitted feedback
app.get("/view-feedback", (req, res) => {
	let feedbackList = "<h1>Submitted Feedback</h1>";
	feedbacks.forEach((item, index) => {
		feedbackList += `
      <div>
        <h3>Feedback #${index + 1}</h3>
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Feedback:</strong> ${item.feedback}</p>
      </div>
      <hr>
    `;
	});
	res.send(feedbackList);
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running at http://${localhost}:${port}`);
});
