import React, { useState, useEffect } from "react";

export default function PlayerForm({ setPlayers, isAI }) {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [previousPlayerO, setPreviousPlayerO] = useState("");

  useEffect(() => {
    if (isAI) {
      setPreviousPlayerO(playerO);
      setPlayerO("AI 🤖");
    } else {
      setPlayerO(previousPlayerO);
    }
  }, [isAI]);

  useEffect(() => {
    setPlayers({ X: playerX, O: playerO });
  }, [playerX, playerO, setPlayers]);

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2 items-center">
        <label className="font-semibold w-20">Player X:</label>
        <input
          type="text"
          placeholder="Enter name for X"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          className="flex-1 p-2 rounded bg-white/70 dark:bg-gray-700/60 backdrop-blur-md"
        />
      </div>

      <div className="flex gap-2 items-center">
        <label className="font-semibold w-20">Player O:</label>
        <input
          type="text"
          placeholder={isAI ? "AI 🤖" : "Enter name for O"}
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          disabled={isAI}
          className={`flex-1 p-2 rounded bg-white/70 dark:bg-gray-700/60 backdrop-blur-md ${isAI ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </div>
    </div>
  );
}
