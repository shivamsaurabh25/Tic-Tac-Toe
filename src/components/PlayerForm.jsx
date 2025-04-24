import React, { useState } from "react";

export default function PlayerForm({ setPlayers }) {
  const [names, setNames] = useState({ X: "", O: "" });

  const handleChange = (e) => {
    setNames({ ...names, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayers(names);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-4">
      <input
        name="X"
        value={names.X}
        onChange={handleChange}
        placeholder="Player X Name"
        className="p-2 rounded border dark:bg-gray-800 dark:text-white"
      />
      <input
        name="O"
        value={names.O}
        onChange={handleChange}
        placeholder="Player O Name"
        className="p-2 rounded border dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="bg-black text-white dark:bg-white dark:text-black p-2 rounded"
      >
        Start Game
      </button>
    </form>
  );
}       ``