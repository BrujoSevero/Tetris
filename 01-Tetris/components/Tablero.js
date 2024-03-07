import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { Shapes, getRandomShape } from './Shapes';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const filas = 20;
const columnas = 10;
const speed = 500; // en ms

const createEmptyBoard = () =>
  Array.from({ length: filas }, () => Array(columnas).fill(0));

const GameBoard = () => {
  const [board, setBoard] = useState(createEmptyBoard()); 
  const [score, setScore] = useState(0);
  const [currentPiece, setCurrentPiece] = useState(getRandomShape());
  const [nextPiece, setNextPiece] = useState(getRandomShape());
  const [currentPosition, setCurrentPosition] = useState({ x: Math.floor(columnas / 2) - 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);  

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setGameOver(false);
    setScore(0);
    setCurrentPiece(getRandomShape());
    setNextPiece(getRandomShape());
    setCurrentPosition({ x: Math.floor(columnas / 2) - 1, y: 0 });
  };

  useEffect(() => {
    if (gameOver) {
      Alert.alert("Game Over", "You have lost!", [
        { text: "Restart", onPress: resetGame }
      ]);
    }
  }, [gameOver]);

  const checkCollision = useCallback((newPosition, piece) => {
    const { shapes, inicio } = piece;
    const shape = shapes[inicio % shapes.length];
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newX = newPosition.x + x;
          const newY = newPosition.y + y;
          if (newY < 0 || newY >= filas || newX < 0 || newX >= columnas || board[newY][newX] !== 0) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  const lockPieceAndGenerateNewOne = () => {
    const newBoard = board.map(row => [...row]);
    const { shapes, inicio, color } = currentPiece;
    const shape = shapes[inicio % shapes.length];
    let collisionAtTop = false;
    shape.forEach((row, y) => row.forEach((value, x) => {
      if (value !== 0) {
        if (currentPosition.y + y < 1) {
          collisionAtTop = true;
        }
        newBoard[y + currentPosition.y][x + currentPosition.x] = color;
      }
    }));

    //Si una de las columnas de la fila de arriba se tapona acaba el juego
    if (collisionAtTop) {
      setGameOver(true);
    } else {
      let cleanLines = 0;
      for (let y = filas - 1; y >= 0; y--) {
        if (newBoard[y].every(cell => cell !== 0)) {
          newBoard.splice(y, 1);
          //unshit se usa para insertar nuevos elementos en un array y retornar la nueva longitud de esta
          newBoard.unshift(Array(columnas).fill(0));
          cleanLines++;
        }
      }

      const emptyRows = Array(cleanLines).fill(Array(columnas).fill(0));
      newBoard.splice(0, cleanLines, ...emptyRows);

      setBoard(newBoard);
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomShape());
      setCurrentPosition({ x: columnas / 2 - 1, y: 0 });
      setScore(prevScore => {
        const newScore = prevScore + cleanLines * 100;
        return newScore;
      });
    }
  };

  const handleMove = (direction) => {
    if (!gameOver) {
      const newPos = { x: currentPosition.x + direction.x, y: currentPosition.y + direction.y };
      if (!checkCollision(newPos, currentPiece)) {
        setCurrentPosition(newPos);
      } else if (direction.y > 0) {
        lockPieceAndGenerateNewOne();
      }
    }
  };

  useEffect(() => {
    const update = () => {
      handleMove({ x: 0, y: 1 });
    };
    const interval = setInterval(update, speed);
    return () => clearInterval(interval);
  }, [currentPosition, currentPiece, board, gameOver, speed]);

  const moveLeft = () => handleMove({ x: -1, y: 0 });
  const moveRight = () => handleMove({ x: 1, y: 0 });
  const moveDown = () => handleMove({ x: 0, y: 1 });
  const rotate = () => {
    const newInicio = (currentPiece.inicio + 1) % currentPiece.shapes.length;
    setCurrentPiece({ ...currentPiece, inicio: newInicio });
  };

  
  return (
    <ImageBackground source={require("../assets/fondoTetris.gif")} style={{ height: "100%" }}>
      <View style={styles.container}>
        <View style={styles.scoreRestartView}>
          <Text style={styles.scoreRestart}>Ptos.: {score}</Text>
          <View>
            <View>
              {nextPiece.shapes[nextPiece.inicio % nextPiece.shapes.length].map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, cellKey) => (
                    <View
                      key={cellKey}
                      style={[styles.cell1, { backgroundColor: cell !== 0 ? nextPiece.color : 'black' }]}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity onPress={resetGame}><Text style={styles.scoreRestart}>Restart</Text></TouchableOpacity>
        </View>

        <View style={styles.boardContainer}>
          <View style={styles.board}>
            {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellKey) => {
                  let color = 'black';
                  if (cell !== 0) {
                    color = cell;
                  } else {
                    const pieceY = rowIndex - currentPosition.y;
                    const pieceX = cellKey - currentPosition.x;
                    if (
                      pieceY >= 0 && pieceY < currentPiece.shapes[currentPiece.inicio % currentPiece.shapes.length].length &&
                      pieceX >= 0 && pieceX < currentPiece.shapes[currentPiece.inicio % currentPiece.shapes.length][pieceY].length &&
                      currentPiece.shapes[currentPiece.inicio % currentPiece.shapes.length][pieceY][pieceX] !== 0
                    ) {
                      color = currentPiece.color;
                    }
                  }
                  return (
                    <View
                      key={cellKey}
                      style={[styles.cell, { backgroundColor: color }]}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.touchableRotateView}>
          <TouchableOpacity onPress={rotate}>
            <Ionicons name="reload-circle" size={40} color="black" />
          </TouchableOpacity>
        </View>

        {/* Botones de control */}
        <View style={styles.touchableButtonView}>
          <TouchableOpacity onPress={moveLeft}>
            <FontAwesome5 name="arrow-circle-left" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={moveDown}>
            <FontAwesome5 name="arrow-circle-down" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={moveRight}>
            <FontAwesome5 name="arrow-circle-right" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  board: {
    borderWidth: 2,
    borderColor: '#FF0093',
    shadowColor: '#FF0093',
    elevation: 10,
    width: columnas * 30,
    height: filas * 30,
    marginRight: 5,
  },
  scoreRestart: {
    backgroundColor: 'black',
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    marginBottom: '8%',
    color: 'white',
  },
  scoreRestartView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: '10%',
    height: 29.8,
    borderWidth: 1.2,
    borderColor: 'white',
  },
  cell1: {
    width: 30,
    height: 30,
    borderWidth: 1.2,
    borderColor: 'white',
  },
  touchableRotateView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '15%',
  },
  touchableButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default GameBoard;