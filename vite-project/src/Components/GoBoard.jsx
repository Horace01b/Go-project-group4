import {useState} from 'react';
/* import styles  */
import "./css.css";

function GoBoard() {
    //simple 9x9 board for Go
    const boardSize = 9 

     

    //2D array to represent the board
     const [board, setBoard] = useState(
        Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => null)
    )); 

    const [currentPlayer, setCurrentPlayer] = useState("black");

    // Function to handle when a player places a stone
    const handlePlay = (row, col) => {
        // If the spot is already taken, ignore the move
        if (board[row][col] !== null) return;

        // Create a copy of the board to update state immutably
        const newBoard = board.map((r, rowIndex) =>
            r.map((cell, colIndex) => {
                if (rowIndex === row && colIndex === col) {
                    return currentPlayer;
                }
                return cell;
            })
        );

        setBoard(newBoard); // Update board
        setCurrentPlayer(currentPlayer === "black" ? "white" : "black"); // Switch player
    };
    
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
                            stone={cell}
                            onPlay={handlePlay}
                        />
                    ))}
                </div>
                ))}
        </div>
         <p className="turn-indicator">Turn: <span className={currentPlayer}>{currentPlayer}</span></p>
        </div>
    );
    
}

function Intersection(props) {
    const { row, col,stone,onPlay } = props;
    const handleClick=() => {
        onPlay(row, col);
    };


    return (
        <div
            className="intersection"
             onClick={handleClick}
            data-row={row}
            data-col={col}>
                {/* Render stone to this intersection */}
                {stone && <div className={`stone ${stone}`} />}
        </div>
    );
}

export default GoBoard;







