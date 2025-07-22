import React from 'react';

function ScoreBoard({ scores, currentPlayer, gameOver }) {
  let winner = '';
  if (gameOver) {
    if (scores.black > scores.white) winner = '🏆 Black wins!';
    else if (scores.white > scores.black) winner = '🏆 White wins!';
    else winner = '🤝 It\'s a tie!';
  }

  return (
    <div className="scoreboard">
      <h2>Score Board</h2>
      <p><strong>Black:</strong> {scores.black} | <strong>White:</strong> {scores.white}</p>
      {/* {!gameOver && <p>🕹️ <strong>Turn:</strong> {currentPlayer}</p>} */}
      {gameOver && (
        <>
          <p className="gameover">Game Over!</p>
          <p className="winner">{winner}</p>
        </>
      )}
    </div>
  );
}

export default ScoreBoard;

            