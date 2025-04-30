import React from "react";

export default function Scoreboard({ scores, players }) {
  return (
    <div className="flex justify-around items-center p-4 rounded-xl shadow-md backdrop-blur-md bg-white/30 dark:bg-black/30 mb-4">
      <div className="px-2 text-center">
        <h2 className="text-lg font-semibold">{players.X || "Player X"}</h2>
        <p className="text-2xl font-bold">{scores.X}</p>
      </div>
      <div className="px-2 text-center">
        <h2 className="text-lg font-semibold">{players.O || "Player O"}</h2>
        <p className="text-2xl font-bold">{scores.O}</p>
      </div>
    </div>
  );
}
