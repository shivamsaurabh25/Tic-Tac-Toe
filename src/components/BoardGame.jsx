import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const initialBoard = Array(9).fill(null);
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function BoardGame({ mode, players, onScoreUpdate, darkMode, isAI, difficulty }) {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadingTile, setFadingTile] = useState(null);
  const [width, height] = useWindowSize();
  const [aiThinking, setAiThinking] = useState(false);

  useEffect(() => {
    resetGame();
  }, [mode, isAI, difficulty]);

  useEffect(() => {
    if (isAI && turn === "O" && !winner && !aiThinking) {
      setAiThinking(true);
      setTimeout(() => {
        aiMove();
        setAiThinking(false);
      }, 500);
    }
  }, [turn, isAI, winner]);

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
    if (board[index] || winner || fadingTile !== null || (isAI && turn === "O" && aiThinking)) return;

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

  const aiMove = () => {
    const emptyIndices = board.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
    let index;
    if (difficulty === "easy") {
      index = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else {
      index = getBestMove(board, "O");
    }
    if (index !== undefined) handleClick(index);
  };

  const getBestMove = (board, player) => {
    const opponent = player === "X" ? "O" : "X";
    const emptyIndices = board.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
    
    const minimax = (newBoard, depth, isMaximizing) => {
      const winner = checkWinner(newBoard);
      if (winner === "X") return -10 + depth;
      if (winner === "O") return 10 - depth;
      if (emptyIndices.length === 0) return 0;

      if (isMaximizing) {
        let best = -Infinity;
        emptyIndices.forEach((index) => {
          const newBoardCopy = [...newBoard];
          newBoardCopy[index] = "O";
          const score = minimax(newBoardCopy, depth + 1, false);
          best = Math.max(score, best);
        });
        return best;
      } else {
        let best = Infinity;
        emptyIndices.forEach((index) => {
          const newBoardCopy = [...newBoard];
          newBoardCopy[index] = "X";
          const score = minimax(newBoardCopy, depth + 1, true);
          best = Math.min(score, best);
        });
        return best;
      }
    };

    let bestMove = -1;
    let bestValue = -Infinity;
    emptyIndices.forEach((index) => {
      const newBoard = [...board];
      newBoard[index] = "O";
      const moveValue = minimax(newBoard, 0, false);
      if (moveValue > bestValue) {
        bestMove = index;
        bestValue = moveValue;
      }
    });

    return bestMove;
  };

  return (
    <div
      className="flex flex-col justify-center py-4 px-4 w-full rounded-xl transition-colors duration-300"
      style={{ backgroundColor: darkMode ? "#111827" : "#f3f4f6" }}
    >
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      <div className="grid grid-cols-3 gap-2 max-w-[400px] w-full mx-auto">
        {board.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className={`h-24 w-full text-4xl font-bold rounded-xl transition-all duration-500 ease-in-out ${
              fadingTile === idx ? "opacity-30 scale-95" : "opacity-100"
            } ${val ? "bg-white/70 dark:bg-gray-700/60" : "bg-white/40 dark:bg-gray-800/40"} backdrop-blur-md shadow-md`}
            disabled={isAI && turn === "O" && aiThinking}
          >
            {val}
          </button>
        ))}
      </div>
      {aiThinking && isAI && (
        <div className="text-center mt-4 text-2xl font-semibold animate-pulse">
          🤖 AI Thinking...
        </div>
      )}
    </div>
  );
}
