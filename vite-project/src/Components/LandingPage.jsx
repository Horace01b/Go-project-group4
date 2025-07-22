import React from "react";
import { useNavigate } from "react-router-dom";
import "./css.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/game");
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to the Go Game</h1>

      <div className="instructions">
        <h2>How to Play</h2>
        <ul>
            <li>Choose your game mode: 
                <strong>Play against the computer</strong> or <strong>2-player mode</strong> to challenge a friend.</li>
            <li><strong>Black goes first</strong> by clicking on any intersection point on the board.</li>
            <li><strong>White plays next</strong>, and players take turns placing stones.</li>
            <li>The goal is to <strong>surround more territory</strong> than your opponent by placing your stones wisely.</li>
            <li>The game ends when <strong>both players pass their turn</strong> or no more moves are possible.</li>
            <li>The player with the most surrounded territory wins!</li>
        </ul>

      </div>

      <button className="start-button" onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
}

export default LandingPage;
