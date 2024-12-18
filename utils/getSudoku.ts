import { SudokuData } from "@/types";

export const getSudoku = async (): Promise<SudokuData> => {
  const result = await fetch("https://you-do-sudoku-api.vercel.app/api");
  const body: SudokuData = await result.json();
  return body;
};
