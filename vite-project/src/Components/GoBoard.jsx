import React, { useState } from "react";
import "./css.css";

import Intersection from "./Intersection";
import ScoreBoard from "./ScoreBoard";
import { getGojiMove } from "./ComputerLogic";
import { applyMove } from "./captureLogic";

function GoBoard() {
  const boardSize = 9;

  const [board, setBoard] = useState(
    Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => null)
    )
  );

  const [currentPlayer, setCurrentPlayer] = useState("black");
  const [scores, setScores] = useState({ black: 0, white: 0 });
  const [captured, setCaptured] = useState({ black: 0, white: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [vsGoji, setVsGoji] = useState(false);

  const [humanPassStreak, setHumanPassStreak] = useState(0); // New tracking for Goji mode
  const [lastMoveWasPass, setLastMoveWasPass] = useState(false); // Used in Goji fallback

  const handlePlay = (row, col) => {
    if (gameOver || board[row][col]) return;

    const { newBoard, capturedStones } = applyMove(
      row,
      col,
      currentPlayer,
      board,
      boardSize
    );

    setBoard(newBoard);

    setScores((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1,
    }));

    const opponent = currentPlayer === "black" ? "white" : "black";
    setCaptured((prev) => ({
      ...prev,
      [opponent]: prev[opponent] + capturedStones,
    }));

    setCurrentPlayer(opponent);
    setLastMoveWasPass(false);

    if (vsGoji && opponent === "white") {
      setTimeout(() => {
        const [botRow, botCol] = getGojiMove(newBoard, "white", boardSize) || [];

        if (botRow === undefined || botCol === undefined) {
          setLastMoveWasPass(true);
          setCurrentPlayer("black");
        } else {
          const { newBoard: botBoard, capturedStones: botCaptured } = applyMove(
            botRow,
            botCol,
            "white",
            newBoard,
            boardSize
          );

          setBoard(botBoard);
          setScores((prev) => ({ ...prev, white: prev.white + 1 }));
          setCaptured((prev) => ({ ...prev, black: prev.black + botCaptured }));
          setLastMoveWasPass(false);
          setCurrentPlayer("black");
        }
      }, 500);
    }
  };

  const handlePass = () => {
    if (gameOver) return;

    if (vsGoji && currentPlayer === "black") {
      const newStreak = humanPassStreak + 1;
      setHumanPassStreak(newStreak);

      if (newStreak >= 2) {
        setGameOver(true);
        return;
      }
      setLastMoveWasPass(true);
      setCurrentPlayer("white");

      setTimeout(() => {
        const [botRow, botCol] = getGojiMove(board, "white", boardSize) || [];

        if (botRow === undefined || botCol === undefined) {
          setLastMoveWasPass(true);
          setCurrentPlayer("black");
        } else {
          const { newBoard: botBoard, capturedStones: botCaptured } = applyMove(
            botRow,
            botCol,
            "white",
            board,
            boardSize
          );

          setBoard(botBoard);
          setScores((prev) => ({ ...prev, white: prev.white + 1 }));
          setCaptured((prev) => ({ ...prev, black: prev.black + botCaptured }));
          setCurrentPlayer("black");
          setLastMoveWasPass(false);
        }
      }, 500);
    } else if (!vsGoji) {
      if (lastMoveWasPass) {
        setGameOver(true);
      } else {
        setLastMoveWasPass(true);
        setCurrentPlayer((prev) => (prev === "black" ? "white" : "black"));
      }
    }
  };

  const resetGame = () => {
    setBoard(
      Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => null)
      )
    );
    setCurrentPlayer("black");
    setScores({ black: 0, white: 0 });
    setCaptured({ black: 0, white: 0 });
    setGameOver(false);
    setHumanPassStreak(0);
    setLastMoveWasPass(false);
  };

  const finalScores = {
    black: scores.black + captured.white,
    white: scores.white + captured.black,
  };

  return (
    <div className="game-container">
      <div className="go-board-switch">
        <button
          onClick={() => {
            setVsGoji((prev) => !prev);
            resetGame();
          }}
          className={`toggle-mode-button ${
            vsGoji ? "goji-mode" : "two-player-mode"
          }`}>
          {vsGoji ? "Playing vs Goji" : "2 Player Mode"}
        </button>
      </div>

      <div className="go-board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Intersection
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              cell={cell}
              boardSize={boardSize}
              onPlay={handlePlay}/>
          ))
        )}
      </div>

      <ScoreBoard
        scores={scores}
        captured={captured}
        finalScores={finalScores}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        onRestart={resetGame}
        onPass={handlePass}/>
    </div>
  );
}

export default GoBoard;
