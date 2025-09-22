// GET endpoint to retrieve all feedback
app.get('/feedback', (req, res) => {
  res.json(feedbackList);
});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for feedback
const feedbackList = [];

// POST endpoint to receive feedback
app.post('/feedback', (req, res) => {
  const { player, feedback } = req.body;
  if (!player || !feedback) {
    return res.status(400).json({ error: 'Missing player or feedback' });
  }
  // Store feedback in memory
  feedbackList.push({ player, feedback, timestamp: new Date().toISOString() });
  res.json({ message: 'Feedback received', player, feedback });
});


// Serve the HTML interface at /
const path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
