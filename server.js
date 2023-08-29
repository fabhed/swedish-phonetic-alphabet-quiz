const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 8080;

// Database connection
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoints
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/random-letters', (req, res) => {
  let query = 'SELECT letter FROM alphabet ORDER BY RANDOM() LIMIT 10';
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows.map(row => row.letter));
  });
});

app.post('/check-answer', (req, res) => {
  let query = 'SELECT word FROM alphabet WHERE letter = ?';
  db.get(query, [req.body.letter], (err, row) => {
    if (err) {
      throw err;
    }
    res.json({correct: req.body.answer.toLowerCase() === row.word.toLowerCase()});
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
