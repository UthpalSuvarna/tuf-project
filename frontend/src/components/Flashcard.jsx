import React, { useState } from "react";

function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  if (!flashcard) {
    return <div>Loading...</div>; // Display a loading message if flashcard is not available
  }

  return (
    <div
      className="flashcard border-2 border-gray-300 p-4 m-2 cursor-pointer flex justify-center items-center w-full h-3/5 text-center text-xl bg-gray-100 rounded-md"
      onClick={handleFlip}
    >
      <div className=" text-6xl">
        {flipped ? flashcard.answer : flashcard.question}
      </div>
    </div>
  );
}

export default Flashcard;
