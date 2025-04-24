import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BoardGame from "./components/BoardGame";
import PlayerForm from "./components/PlayerForm";
import Scoreboard from "./components/Scoreboard";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("normal");
  const [players, setPlayers] = useState({ X: "", O: "" });
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const changeMode = (newMode) => {
    setMode(newMode);
  };

  const updateScore = (winner) => {
    if (winner) {
      setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-pink-100 to-blue-200 text-black"
      } min-h-screen transition-all flex flex-col justify-between`}
    >
      <div>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          mode={mode}
          changeMode={changeMode}
        />
        <div className="max-w-xl mx-auto p-4">
          <PlayerForm setPlayers={setPlayers} />
          <Scoreboard players={players} scores={scores} />
          <BoardGame
            darkMode={darkMode}
            mode={mode}
            players={players}
            onScoreUpdate={updateScore}
          />
        </div>
      </div>
      <footer className="text-center p-4 text-sm opacity-80">
        ~made with (❤️) by{" "}
        <a
          href="https://github.com/shivamsaurabh25"
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