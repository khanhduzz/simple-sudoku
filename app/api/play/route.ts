import { SudokuData } from "@/types";

export async function GET() {
  const data = await getSudoku();
  return Response.json({ data });
}

export const getSudoku = async () => {
  const result = await fetch("https://you-do-sudoku-api.vercel.app/api");
  const body: SudokuData = await result.json();

  return body;
};
