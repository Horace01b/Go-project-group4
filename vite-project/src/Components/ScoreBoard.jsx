import React from "react";
import "./css.css";

function ScoreBoard({ scores, currentPlayer, gameOver, onRestart, onPass }) {
  let winner = "";
  if (gameOver) {
    if (scores.black > scores.white) winner = " Black wins!";
    else if (scores.white > scores.black) winner = " White wins!";
    else winner = " It's a tie!";
  }

  return (
    <div className="scoreboard">
      <h2> Score Board</h2>
      <p><strong>Black:</strong> {scores.black} | <strong>White:</strong> {scores.white}</p>
      {!gameOver && <p> Turn: {currentPlayer}</p>}

      {gameOver && (
        <>
          <p className="gameover">Game Over!</p>
          <p className="winner">{winner}</p>
        </>
      )}

      <button className="btn green" onClick={onRestart}> Restart</button>
      <button
        className="btn green"
        onClick={() => {
          if (!gameOver && window.confirm("Pass your turn?")) {
            onPass();
          }
        }}>
         Pass
      </button>
    </div>
  );
}

export default ScoreBoard;
