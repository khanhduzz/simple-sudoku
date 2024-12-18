"use client";

import { isValidSudoku, solveSudoku } from "@/utils";
import { useState } from "react";

const GridSudoku: React.FC = () => {
  const [data, setData] = useState<string[][]>([
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
  ]);

  const gridSize = 450;

  function handleSolve() {
    try {
      if (!isValidSudoku(data)) {
        alert("Sudoku is not valid");
        return;
      }
      const solvedData = solveSudoku(data);
      setData(solvedData);
    } catch (error) {
      console.error("Error solving Sudoku:", error);
    }
  }

  function handleReset() {
    setData([
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
    ]);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]$/.test(value)) {
      const newData = [...data];
      newData[rowIndex][colIndex] = value === "" ? "." : value;
      setData(newData);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Sudoku</h2>
      <div
        style={{
          width: `${gridSize}px`,
          height: `${gridSize}px`,
        }}
        className="grid grid-cols-9 grid-rows-9 border-2 border-black"
      >
        {data.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            
            const isTopBorder = rowIndex % 3 === 0;
            const isLeftBorder = colIndex % 3 === 0;
            const isBottomBorder = rowIndex === 8;
            const isRightBorder = colIndex === 8;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex justify-center items-center w-full h-full
                  ${isTopBorder ? "border-t-4 border-black" : "border-t border-gray-300"}
                  ${isLeftBorder ? "border-l-4 border-black" : "border-l border-gray-300"}
                  ${isBottomBorder ? "border-b-4 border-black" : "border-b border-gray-300"}
                  ${isRightBorder ? "border-r-4 border-black" : "border-r border-gray-300"}
                  ${col !== "." ? "bg-gray-100" : "bg-white"} font-bold text-lg`}
              >
                <input
                  value={col !== "." ? col : ""}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  type="number"
                  // disabled={col !== "."}
                  className="text-center text-lg bg-transparent border-none w-full h-full"
                />
              </div>
            );
          })
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleSolve}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Solve
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GridSudoku;
