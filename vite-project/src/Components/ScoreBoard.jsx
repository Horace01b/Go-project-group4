import React from "react";
import "./css.css";

function ScoreBoard({ scores, captured, finalScores, currentPlayer, gameOver, onRestart, onPass }) {
  let winner = "";
  if (gameOver) {
    if (finalScores.black > finalScores.white) winner = "Black wins!";
    else if (finalScores.white > finalScores.black) winner = "White wins!";
    else winner = "It's a tie!";
  }

  return (
    <div className="scoreboard">
      <h2>Score Board</h2>

      <p>
        <strong>Black</strong>: Stones Placed: {scores.black} | Captured: {captured.white} | Total: {finalScores.black}
      </p>
      <p>
        <strong>White</strong>: Stones Placed: {scores.white} | Captured: {captured.black} | Total: {finalScores.white}
      </p>

      {!gameOver && <p>Turn: <strong>{currentPlayer}</strong></p>}

      {gameOver && (
        <>
          <p className="gameover">Game Over!</p>
          <p className="winner">{winner}</p>
        </>
      )}

      <button className="btn green" onClick={onRestart}>Restart</button>
      <button
        className="btn green"
        onClick={() => {
          if (!gameOver && window.confirm("Pass your turn?")) {
            onPass();
          }
        }}
      >
        Pass
      </button>
    </div>
  );
}

export default ScoreBoard;
