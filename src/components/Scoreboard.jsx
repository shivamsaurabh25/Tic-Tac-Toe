import React from "react";

export default function Scoreboard({ players, scores }) {
  return (
    <div className="flex justify-around my-4 text-lg font-semibold">
      <div>{players.X || "Player X"}: {scores.X}</div>
      <div>{players.O || "Player O"}: {scores.O}</div>
    </div>
  );
}