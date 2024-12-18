"use client";

import GridSudoku from '@/components/GridSudoku'
import { baseSudoku, isValidSudoku, solveSudoku } from '@/utils';
import React, { useState } from 'react'

const SolveSudoku = () => {

    const [data, setData] = useState<string[][]>(baseSudoku);

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
        setData(baseSudoku);
    }

    return (
        <div>
            <GridSudoku data={data} setData={setData} />
            <div className="flex justify-center items-center gap-3 mt-3">
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

    )
}

export default SolveSudoku