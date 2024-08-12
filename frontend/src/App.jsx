import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/homepage";
import Editpage from "./pages/editpage";
import Addcards from "./pages/addpage";

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col">
      <header className="App-header bg-white shadow-md p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <a
            href="/"
            className="text-xl font-bold text-blue-500 hover:text-blue-700"
          >
            Home
          </a>
          <a
            href="/add"
            className="text-xl font-bold text-blue-500 hover:text-blue-700"
          >
            Add Cards
          </a>
          <a
            href="/edit"
            className="text-xl font-bold text-blue-500 hover:text-blue-700"
          >
            Edit Cards
          </a>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/edit" element={<Editpage />} />
            <Route path="/add" element={<Addcards />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
