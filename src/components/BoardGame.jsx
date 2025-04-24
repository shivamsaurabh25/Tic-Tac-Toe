import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const initialBoard = Array(9).fill(null);
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function BoardGame({ mode, players, onScoreUpdate, darkMode }) {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadingTile, setFadingTile] = useState(null);
  const [width, height] = useWindowSize();

  useEffect(() => {
    resetGame();
  }, [mode]);

  const resetGame = () => {
    setBoard(initialBoard);
    setTurn("X");
    setWinner(null);
    setHistory([]);
    setShowConfetti(false);
    setFadingTile(null);
  };

  const checkWinner = (b) => {
    for (let [a, b1, c] of winCombos) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    if (!b.includes(null)) return "Draw";
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || fadingTile !== null) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    let updatedHistory = [...history, { index, player: turn }];

    if (mode === "endless") {
      const playerMoves = updatedHistory.filter((m) => m.player === turn);
      if (playerMoves.length > 3) {
        const toRemove = playerMoves[0];
        setFadingTile(toRemove.index);

        setTimeout(() => {
          newBoard[toRemove.index] = null;
          updatedHistory = updatedHistory.filter((m) => m.index !== toRemove.index);
          setFadingTile(null);
          finalizeMove(newBoard, updatedHistory);
        }, 500);
        return;
      }
    }

    finalizeMove(newBoard, updatedHistory);
  };

  const finalizeMove = (newBoard, updatedHistory) => {
    setBoard(newBoard);
    setHistory(updatedHistory);

    const winResult = checkWinner(newBoard);

    if (winResult) {
      setTimeout(() => {
        setWinner(winResult);
        if (winResult !== "Draw") onScoreUpdate(winResult);
        setShowConfetti(true);

        setTimeout(() => {
          const name =
            winResult === "Draw"
              ? "It's a Draw!"
              : `${players[winResult] || winResult} Wins!`;
          if (window.confirm(name + "\nClick OK to play again.")) {
            resetGame();
          }
        }, 600);

      }, 300);
    } else {
      setTurn((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  return (
    <div
      className="flex justify-center py-4 px-4 rounded-xl transition-colors duration-300"
      style={{ backgroundColor: darkMode ? "#111827" : "#f3f4f6" }}
    >
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      <div className="grid grid-cols-3 gap-2 max-w-[400px] w-full">
        {board.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className={`h-24 w-full text-4xl font-bold rounded-xl transition-all duration-500 ease-in-out
              ${fadingTile === idx ? "opacity-30 scale-95" : "opacity-100"}
              ${val ? "bg-white/70 dark:bg-gray-700/60" : "bg-white/40 dark:bg-gray-800/40"} 
              backdrop-blur-md shadow-md`}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}