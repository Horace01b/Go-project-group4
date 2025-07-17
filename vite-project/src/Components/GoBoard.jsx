import React from 'react';
/* import styles  */
import "./css.css";

function GoBoard() {
    //simple 9x9 board for Go
    const boardSize = 9  

    //2D array to represent the board
    const board = Array.from({length: boardSize}, () =>
        Array.from({length: boardSize}, () => null)
    ); 
    
    return (
        <div className="go-board-container">
        <div className="go-board">
            {board.map((row, rowIndex) => (
                <div className="board-row"key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <Intersection 
                            key={`${rowIndex}-${colIndex}`}
                            row={rowIndex}
                            col={colIndex}
                        />
                    ))}
                </div>
                ))}
        </div>
        </div>
    );
    
}

function Intersection(props) {
    const { row, col } = props;
    return (
        <div
            className="intersection"
            data-row={row}
            data-col={col}>
                {/* Render stone to this intersection */}
                
        </div>
    );
}

export default GoBoard;
