import { applyMove } from "./captureLogic";

export function getGojiMove(board, currentPlayer) {
  const legalMoves = [];
  const opponent = currentPlayer === "black" ? "white" : "black";

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] !== null) continue;

      const { newBoard } = applyMove(row, col, currentPlayer, board, board.length);

      if (
        JSON.stringify(newBoard) !== JSON.stringify(board) &&
        newBoard[row][col] === currentPlayer
      ) {
        legalMoves.push({ row, col, board: newBoard });
      }
    }
  }

  for (const move of legalMoves) {
    const before = countStones(board, opponent);
    const after = countStones(move.board, opponent);

    if (after < before) {
      return [move.row, move.col];
    }
  }

  
  if (legalMoves.length > 0) {
    const randomIndex = Math.floor(Math.random() * legalMoves.length);
    return [legalMoves[randomIndex].row, legalMoves[randomIndex].col];
  }

  return null;
}

function countStones(board, color) {
  return board.reduce(
    (sum, row) => sum + row.filter((cell) => cell === color).length,
    0
  );
}
