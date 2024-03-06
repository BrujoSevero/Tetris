import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { colors } from '../styles/colors';

const Shapes = [
  [[1, 1, 1, 1]]
]

const terminoes = {
  I: {
    shape: [
      [1, 1, 1, 1],
    ],
    color: colors.blue,
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: colors.red,
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: colors.green,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: colors.pink,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: colors.orange,
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: colors.purple,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: colors.yellow,
  },
};

const columnas = 10
const filas = 20

class Tetris {
  constructor() {    
    this.board = Array.from({ length: filas }, () => Array(columnas).fill(null));
    this.generatePiece()
  }

  generatePiece() {
    const shape = Shapes[Math.floor(Math.random() * Shapes.length)]
    this.piece = {
      x: columnas / 2,
      y: 0,
      shape,
    }

    this.place()
  }

  place({ remove = false } = {}) {
    const { shape } = this.piece
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        const newY = this.piece.y + y
        const newX = this.piece.x + x
        this.board[newY][newX] = remove ? 0 : shape[y][x]
      }
    }
  }

  move({ dx = 0, dy = 0 }) {
    this.place({ remove: true })
    this.piece.x += dx
    this.piece.y += dy
    this.place()
  }
}

const tetris = new Tetris()

export default function TetrisGame() {
  const [_, render] = useState({})
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const keyDownHandler = (e) => {
      console.log('key', e.nativeEvent.key)
      if (e.key === 'ArrowDown') {
        tetris.move({dy : 1})
      }
      render({})
    }

    const androidKeyListener = Keyboard.addListener('keyboardDidHide', keyDownHandler);
    const iosKeyListener = Keyboard.addListener('keyboardDidHide', keyDownHandler);

    return () => {
      androidKeyListener.remove();
      iosKeyListener.remove();
    };
  }, [isListening]);

  const toggleKeyListener = () => {
    setIsListening((prev) => !prev);
  };

  return (
    <>
      <View style={styles.container}>
        {tetris.board.map((row, i) =>
          <View key={i} style={styles.viewBoardStyles}>
            {row.map((cell, j) => <View key={j} style={cell === 1 ? styles.shapeCellStyles : styles.cellStyles}><Text>{cell}</Text></View>)}
          </View>
        )}
        <TouchableOpacity onPress={toggleKeyListener} style={styles.button}>
          <Text style={styles.buttonText}>{isListening ? 'Detener' : 'Comenzar'}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  shapeCellStyles: {
    width: '6%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'pink',
    alignItems: 'center',
  },
  cellStyles: {
    width: '6%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  viewBoardStyles: {
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});