import React, { useState } from "react";
import ScoreBoard from "./ScoreBoard";

function GoGameControls() {
  const [scores, setScores] = useState({ black: 4, white: 6 });
  const [currentPlayer, setCurrentPlayer] = useState("Black");
  const [gameOver, setGameOver] = useState(false);

  const endGame = () => {
    setGameOver(true);
  };

  return (
    <div className="p-4">
      <ScoreBoard scores={scores} currentPlayer={currentPlayer} gameOver={gameOver} />
      
      {!gameOver && (
        <button
          onClick={endGame}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          End Game
        </button>
      )}
    </div>
  );
}

export default GoGameControls;
