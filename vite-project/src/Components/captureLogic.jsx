// src/utils/captureUtils.js
export const getGroup = (row, col, board, boardSize, visited = new Set()) => {
  const color = board[row][col];
  const group = [];
  const stack = [[row, col]];

  while (stack.length) {
    const [r, c] = stack.pop();
    const key = `${r},${c}`;

    if (visited.has(key)) continue;
    visited.add(key);
    group.push([r, c]);

    for (const [dr, dc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nr < boardSize &&
        nc >= 0 &&
        nc < boardSize &&
        board[nr][nc] === color
      ) {
        stack.push([nr, nc]);
      }
    }
  }

  return group;
};

export const hasLiberties = (group, board, boardSize) => {
  for (const [r, c] of group) {
    for (const [dr, dc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nr < boardSize &&
        nc >= 0 &&
        nc < boardSize &&
        board[nr][nc] === null
      ) {
        return true;
      }
    }
  }
  return false;
};

export const removeGroup = (group, board) => {
  const newBoard = board.map((row) => row.slice());
  for (const [r, c] of group) {
    newBoard[r][c] = null;
  }
  return newBoard;
};

export const applyMove = (row, col, player, boardState, boardSize) => {
  let newBoard = boardState.map((r) => r.slice());
  newBoard[row][col] = player;

  const opponent = player === "black" ? "white" : "black";

  for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 &&
      newRow < boardSize &&
      newCol >= 0 &&
      newCol < boardSize &&
      newBoard[newRow][newCol] === opponent
    ) {
      const group = getGroup(newRow, newCol, newBoard, boardSize);
      if (!hasLiberties(group, newBoard, boardSize)) {
        newBoard = removeGroup(group, newBoard);
      }
    }
  }

  return newBoard;
};
