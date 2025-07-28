export function getGojiMove(board, player, boardSize) {
  const legalMoves = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (!board[row][col]) {
        legalMoves.push([row, col]);
      }
    }
  }

  if (legalMoves.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * legalMoves.length);
  return legalMoves[randomIndex];
}
