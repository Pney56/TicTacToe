import React, { useState } from 'react';
import Board from './Board';

function UltimateBoard() {
    const [squares, setSquares] = useState(Array(9).fill(Array(9).fill(null)));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (boardIndex, i) => {
        const squaresCopy = squares.slice();
        if (calculateWinner(squaresCopy[boardIndex]) || squaresCopy[boardIndex][i]) {
            return;
        }
        squaresCopy[boardIndex] = squaresCopy[boardIndex].slice(); // copy inner array
        squaresCopy[boardIndex][i] = xIsNext ? 'X' : 'O';
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);

        const winner = calculateWinner(squaresCopy[boardIndex]);
        if (winner) {
            squaresCopy[boardIndex] = Array(9).fill(winner);
            setSquares(squaresCopy);
        }

        const ultimateWinner = calculateUltimateWinner(squaresCopy);
        if (ultimateWinner) {
            alert(ultimateWinner + ' a gagné le jeu ultime!');
        }
    };

    const renderBoard = (i) => {
        return <Board squares={squares[i]} onClick={(index) => handleClick(i, index)} />;
    };

    return (
        <div>
            <div className="game-board">
                {Array(9).fill(null).map((_, i) => (
                    <div key={i} className="ultimate-board-row">
                        {renderBoard(i)}
                    </div>
                ))}
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function calculateUltimateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a][0] && squares[a][0] === squares[b][0] && squares[a][0] === squares[c][0]) {
            return squares[a][0];
        }
    }
    return null;
}

export default UltimateBoard;