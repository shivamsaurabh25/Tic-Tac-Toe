import React from "react";

export default function Navbar({
  darkMode,
  toggleDarkMode,
  mode,
  changeMode,
  isAI,
  toggleAI,
  Difficulty,
  setDifficulty,
}) {
  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4 md:gap-0 shadow-md backdrop-blur-md bg-white/30 dark:bg-black/30 relative z-10">
      <div className="flex items-center gap-3 relative">
        <div className="absolute -inset-3 rounded-full blur-2xl animate-glow bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 z-0"></div>
        <img
          src="https://iili.io/3MIK6RR.md.png"
          alt="logo"
          className="w-12 h-12 relative z-10"
        />
        <h1 className="text-2xl font-bold relative z-10">Tic Tac Toe</h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
        <select
          className="bg-transparent border p-1 rounded text-black dark:text-white dark:bg-black/30 w-full md:w-auto"
          value={mode}
          onChange={(e) => changeMode(e.target.value)}
        >
          <option value="normal">Normal Mode</option>
          <option value="endless">Endless Mode</option>
        </select>

        <select
          className="bg-transparent border p-1 rounded text-black dark:text-white dark:bg-black/30 w-full md:w-auto"
          value={Difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy AI</option>
          <option value="hard">Hard AI</option>
        </select>

        <button
          onClick={toggleAI}
          className="px-3 py-1 w-full md:w-auto bg-gradient-to-r from-green-400 to-blue-500 text-white rounded font-semibold hover:scale-105 transition"
        >
          {isAI ? "Player vs Player" : "Player vs AI"}
        </button>

        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 w-full md:w-auto bg-black text-white dark:bg-white dark:text-black rounded"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}
