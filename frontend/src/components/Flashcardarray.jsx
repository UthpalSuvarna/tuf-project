import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Flashcard.jsx";

function FlashcardArray() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/flashcards"); // Adjust the URL to your backend endpoint
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, []);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (flashcards.length === 0) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="flashcard-array w-3/5 h-100vh">
      <Flashcard flashcard={flashcards[currentIndex]} />
      <div className="navigation flex  justify-between">
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={prevFlashcard}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextFlashcard}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FlashcardArray;
