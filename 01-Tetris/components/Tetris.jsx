import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const rows = 20;
const cols = 10;
const speed = 500;

const createEmptyBoard = () => {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
};

const Tetris = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState({
    shape: pieces.I.shape,
    color: pieces.I.color,
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        movePiece(-1); // Mover a la izquierda
      } else if (event.key === 'ArrowRight') {
        movePiece(1); // Mover a la derecha
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPiece]);

  const movePiece = (direction) => {
    // Copia del estado actual
    const newPiece = { ...currentPiece };
    newPiece.position.x += direction;

    // Verifica si la nueva posición es válida
    if (isValidMove(newPiece)) {
      setCurrentPiece(newPiece);
    }
  };

  const isValidMove = (piece) => {
    return true;
  };

  return (
    <View>
      <Text>Tetris</Text>
      <View className="tetris-board" style={styles.container}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} className="tetris-row">
            {row.map((cell, colIndex) => (
              <View key={colIndex} className={`tetris-cell${cell ? ' tetris-cell-filled' : ''}`} />
            ))}
          </View>
        ))}
      </View>
      <TetrisPiece shape={currentPiece.shape} color={currentPiece.color} />
    </View>
  );
};

export default Tetris;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
  },
});