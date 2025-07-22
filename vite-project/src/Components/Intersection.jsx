// src/Components/Intersection.jsx
//import React from "react";   
import "./css.css"; 

function Intersection({ rowIndex, colIndex, cell, boardSize, onPlay }) {
  const top = `${(rowIndex / (boardSize - 1)) * 100}%`;
  const left = `${(colIndex / (boardSize - 1)) * 100}%`;

  return (
    <div
      className="intersection"
      style={{ top, left }}
      onClick={() => onPlay(rowIndex, colIndex)}
    >
      {cell && <div className={`stone ${cell}`} />}
    </div>
  );
}

export default Intersection;
