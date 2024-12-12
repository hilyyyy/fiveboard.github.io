import React, { useState } from 'react';
import './App.css';

const Board = ({ board, handleCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell === 'B' ? 'black' : cell === 'W' ? 'white' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const initBoard = () => {
    const board = Array(15).fill(null).map(() => Array(15).fill(null));
    return board;
  };

  const [board, setBoard] = useState(initBoard());
  const [isBlackNext, setIsBlackNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const checkWin = (board, row, col, player) => {
    const directions = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]],
    ];

    for (let [dir1, dir2] of directions) {
      let count = 1;
      let [dx, dy] = dir1;
      let [r, c] = [row + dx, col + dy];
      while (r >= 0 && r < 15 && c >= 0 && c < 15 && board[r][c] === player) {
        count++;
        r += dx;
        c += dy;
      }

      [dx, dy] = dir2;
      [r, c] = [row + dx, col + dy];
      while (r >= 0 && r < 15 && c >= 0 && c < 15 && board[r][c] === player) {
        count++;
        r += dx;
        c += dy;
      }

      if (count >= 5) return true;
    }
    return false;
  };

  const handleCellClick = (row, col) => {
    if (board[row][col] !== null || isGameOver) return;

    const newBoard = board.map((r, rIdx) =>
      r.map((cell, cIdx) => (rIdx === row && cIdx === col ? (isBlackNext ? 'B' : 'W') : cell))
    );
    setBoard(newBoard);

    if (checkWin(newBoard, row, col, isBlackNext ? 'B' : 'W')) {
      setIsGameOver(true);
      alert(isBlackNext ? '黑方获胜!' : '白方获胜!');
    } else {
      setIsBlackNext(!isBlackNext);
    }
  };

  const handleReset = () => {
    setBoard(initBoard());
    setIsBlackNext(true);
    setIsGameOver(false);
  };

  return (
    <div className="App">
      <h1>五子棋</h1>
      <Board board={board} handleCellClick={handleCellClick} />
      <div>
        <button onClick={handleReset} className="reset-button">重置游戏</button>
      </div>
      <div>
        {isGameOver ? '游戏结束！' : `当前棋手：${isBlackNext ? '黑方' : '白方'}`}
      </div>
    </div>
  );
};

export default App;
