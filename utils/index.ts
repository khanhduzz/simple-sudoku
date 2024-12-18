export const baseSudoku = [
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
];

export function solveSudoku(board: string[][]): string[][] {
  const n = board.length;
  const row: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  const col: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  const square: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  initialize(board);

  const solved = fillSudo(board, 0, 0);
  if (!solved) {
    throw new Error("No solution found");
  }

  function initialize(board: string[][]): void {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] !== ".") {
          const num = parseInt(board[i][j]) - 1;
          row[i][num] = 1;
          col[j][num] = 1;
          square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = 1;
        }
      }
    }
  }

  function fillSudo(board: string[][], i: number, j: number): boolean {
    if (i === n) return true;
    if (j === n) return fillSudo(board, i + 1, 0);
    if (board[i][j] !== ".") return fillSudo(board, i, j + 1);

    for (let num = 0; num < n; num++) {
      if (isValid(i, j, num)) {
        board[i][j] = String.fromCharCode(num + "1".charCodeAt(0));
        row[i][num] = 1;
        col[j][num] = 1;
        square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = 1;

        if (fillSudo(board, i, j + 1)) return true;

        board[i][j] = ".";
        row[i][num] = 0;
        col[j][num] = 0;
        square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = 0;
      }
    }
    return false;
  }

  function isValid(i: number, j: number, num: number): boolean {
    return (
      row[i][num] === 0 &&
      col[j][num] === 0 &&
      square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] === 0
    );
  }

  return [...board.map((row) => [...row])];
}

export function isValidSudoku(board: string[][]): boolean {
  const n = board.length;
  const row: boolean[][] = Array.from({ length: n }, () =>
    Array(n).fill(false)
  );
  const col: boolean[][] = Array.from({ length: n }, () =>
    Array(n).fill(false)
  );
  const square: boolean[][] = Array.from({ length: n }, () =>
    Array(n).fill(false)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === ".") continue;

      const num = parseInt(board[i][j]) - 1;

      if (
        row[i][num] ||
        col[j][num] ||
        square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num]
      ) {
        return false;
      }

      row[i][num] = true;
      col[j][num] = true;
      square[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = true;
    }
  }

  return true;
}

export function parseData(data: string): string[][] {
  const size = 9;
  const sudokuArray: string[][] = [];

  for (let i = 0; i < size; i++) {
    const row = data
      .slice(i * size, (i + 1) * size)
      .split("")
      .map((t) => {
        return t === "0" ? "." : t;
      });
    sudokuArray.push(row);
  }

  console.log(sudokuArray);

  return sudokuArray;
}
