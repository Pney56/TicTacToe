import React, { useState } from 'react';
import Board from './Board';
import Modal from 'react-modal';

function UltimateBoard() {
    const [squares, setSquares] = useState(Array(9).fill(Array(9).fill(null)));
    const [player, setPlayer] = useState('X');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false); // Ajout de la nouvelle variable d'état

    const changePlayer = () => {
        setPlayer(player === 'X' ? 'O' : 'X');
    };

    const resetGame = () => {
        setSquares(Array(9).fill(Array(9).fill(null)));
        setPlayer('X');
        setModalIsOpen(false);
        setGameOver(false); // Réinitialisation de gameOver lors de la réinitialisation du jeu
    };

    const handleClick = (boardIndex, i) => {
        if (gameOver) { // Si le jeu est terminé, on ne fait rien
            return;
        }

        const squaresCopy = squares.slice();
        if (calculateWinner(squaresCopy[boardIndex]) || squaresCopy[boardIndex][i]) {
            return;
        }
        squaresCopy[boardIndex] = squaresCopy[boardIndex].slice(); // copy inner array
        squaresCopy[boardIndex][i] = player;
        setSquares(squaresCopy);
        changePlayer();

        const winner = calculateWinner(squaresCopy[boardIndex]);
        if (winner) {
            squaresCopy[boardIndex] = Array(9).fill(winner);
            setSquares(squaresCopy);
        }

        const ultimateWinner = calculateUltimateWinner(squaresCopy);
        if (ultimateWinner) {
            setModalIsOpen(true);
            setGameOver(true); // Si un gagnant est déterminé, on met gameOver à true
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
            <button onClick={resetGame} className="Reset">Reset Game</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Victory Modal"
                style={{
                    content: {
                        width: '20%',
                        height: '20%',
                        margin: 'auto',
                    },
                }}
            >
                <h2>{player === 'X' ? 'O' : 'X'} a gagné le jeu ultime!</h2>
            </Modal>
        </div>
    );
}

// ...

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
        // Use the calculateWinner function to check if there is a winner for the board
        const aWin = calculateWinner(squares[a]);
        const bWin = calculateWinner(squares[b]);
        const cWin = calculateWinner(squares[c]);
        if (aWin && aWin === bWin && aWin === cWin) {
            return aWin; // Return the winner ('X' or 'O')
        }
    }
    return null; // Return null if there is no ultimate winner yet
}


export default UltimateBoard;