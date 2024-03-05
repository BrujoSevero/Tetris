import React from 'react';

const TetrisPiece = ({ shape, color }) => {
  return (
    <div className={`tetris-piece ${color}`}>
      {shape.map((row, rowIndex) => (
        <div key={rowIndex} className="tetris-row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`tetris-cell${cell ? ' tetris-cell-filled' : ''}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrisPiece;