const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mysqlConfig = {
  host: "db",
  user: "root",
  password: "pass123",
  database: "appdb",
};

let con = null;
const connectWithRetry = () => {
  con = mysql.createConnection(mysqlConfig);
  con.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log("Connected to the database");
    }
  });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/flashcards", (req, res) => {
  con.query("SELECT * FROM flashcards", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(results);
  });
});

app.delete("/flashcards/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM flashcards WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json({ message: "Flashcard deleted successfully" });
  });
});

app.put("/flashcards/:id", (req, res) => {
  const id = req.params.id;
  const { question, answer } = req.body;
  con.query(
    "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
    [question, answer, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database query failed" });
        return;
      }
      res.json({ message: "Flashcard updated successfully" });
    }
  );
});

app.post("/flashcards", (req, res) => {
  const { question, answer } = req.body;
  con.query(
    "INSERT INTO flashcards (question, answer) VALUES (?, ?)",
    [question, answer],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Failed to create flashcard" });
        return;
      }
      res.status(201).json({ message: "Flashcard created successfully" });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
