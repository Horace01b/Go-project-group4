const directions = [
  [0, 1], 
  [0, -1],
  [1, 0],
  [-1, 0] 
];

function hasLiberty(board, row, col) {
  for (let [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

if (
  newRow >= 0 && newRow < board.length &&
  newCol >= 0 && newCol < board.length &&
  board[newRow][newCol] === null
) {
  return true;
}
  }

  return false;
}

export function applyMove(row, col, player, board) {
  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = player;

  const opponent = player === 'black' ? 'white' : 'black';
  let capturedStones = 0;

  for (let [dx, dy] of directions) {
    const r = row + dx;
    const c = col + dy;

if (
  r >= 0 && r < board.length &&
  c >= 0 && c < board.length &&
  newBoard[r][c] === opponent &&
  !hasLiberty(newBoard, r, c)
) {
  newBoard[r][c] = null;
  capturedStones += 1;
}
  }

  return { newBoard, capturedStones };
}

