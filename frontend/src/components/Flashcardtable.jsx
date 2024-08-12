// src/components/FlashcardTable.js
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function FlashcardTable() {
  const [flashcards, setFlashcards] = useState([]);
  const fetchFlashcards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/flashcards");
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };
  useEffect(() => {
    fetchFlashcards();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/flashcards/${id}`); // Update URL as necessary
      alert("Flashcard deleted successfully");
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const handleEdit = async (id) => {
    const newQuestion = prompt("Enter new question:");
    const newAnswer = prompt("Enter new answer:");

    if (newQuestion && newAnswer) {
      try {
        await axios.put(`http://localhost:3000/flashcards/${id}`, {
          question: newQuestion,
          answer: newAnswer,
        });
        alert("Flashcard updated successfully");
      } catch (error) {
        console.error("Error updating flashcard:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Flashcard List</h2>
      <a href="/add" className="text-blue-500 underline mb-4">
        Add Flashcard
      </a>
      <table className="w-full border-spacing-2 border">
        <thead>
          <tr>
            <th className="py-2">Question</th>
            <th className="py-2">Answer</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flashcards.map((flashcard) => (
            <tr key={flashcard.id}>
              <td className="py-2">{flashcard.question}</td>
              <td className="py-2">{flashcard.answer}</td>
              <td className="py-2">
                <button
                  onClick={() => handleEdit(flashcard.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(flashcard.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlashcardTable;
