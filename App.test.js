import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// 检查胜利的函数
const checkWinner = () => {
  // 水平、垂直和两个对角线的方向偏移
  const directions = [
    [0, 1], // 水平
    [1, 0], // 垂直
    [1, 1], // 主对角线
    [1, -1], // 副对角线
  ];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (squares[row][col]) {
        for (let [dx, dy] of directions) {
          let count = 1;
          for (let step = 1; step < 5; step++) {
            const newRow = row + dx * step;
            const newCol = col + dy * step;
            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && squares[newRow][newCol] === squares[row][col]) {
              count++;
            } else {
              break;
            }
          }
          if (count === 5) {
            return squares[row][col]; // 返回获胜玩家（'X' 或 'O'）
          }
        }
      }
    }
  }

  return null; // 没有获胜者
};
