import React, { useState } from "react";
import BoardGame from "./components/BoardGame";
import Navbar from "./components/Navbar";
import PlayerForm from "./components/PlayerForm";
import Scoreboard from "./components/Scoreboard";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("normal");
  const [players, setPlayers] = useState({ X: "", O: "" });
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });
  const [isAI, setIsAI] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const changeMode = (val) => setMode(val);
  const toggleAI = () => setIsAI((prev) => !prev);

  const handleScoreUpdate = (winner) => {
    setScores((prev) => ({
      ...prev,
      [winner]: (prev[winner] || 0) + 1,
    }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        mode={mode}
        changeMode={changeMode}
        isAI={isAI}
        toggleAI={toggleAI}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <div className="container mx-auto py-8 px-4 flex flex-col items-center">
      <PlayerForm
        setPlayers={setPlayers} isAI={isAI}
      />
        <Scoreboard scores={scores} players={players} darkMode={darkMode} />
        <BoardGame
          mode={mode}
          players={players}
          onScoreUpdate={handleScoreUpdate}
          darkMode={darkMode}
          isAI={isAI}
          difficulty={difficulty}
        />
      </div>
      <footer className="text-center p-4 text-sm opacity-80">
        ~made with (❤️) by{" "}
        <a
          href="https://shivamsaurabh25-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500"
        >
          Shivam
        </a>
      </footer>
    </div>
  );
}
