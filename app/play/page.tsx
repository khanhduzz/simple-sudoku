"use client";

import GridSudoku from '@/components/GridSudoku';
import { SudokuData } from '@/types';
import { baseSudoku, parseData } from '@/utils';
import React, { useEffect, useState } from 'react';
import Loading from './loading';

const PlaySudoku = () => {
    const [data, setData] = useState<string[][]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/play", {
                    signal: abortController.signal,
                });
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const body = await res.json();
                const b: SudokuData = body.data;
                setData(parseData(b.puzzle));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false); // Stop loading once the request completes (success or failure)
            }
        };

        fetchData();

        return () => abortController.abort();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <GridSudoku data={data ?? baseSudoku} setData={setData} />
    );
};

export default PlaySudoku;
