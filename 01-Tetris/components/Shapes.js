import { colors } from '../styles/colors';

export const Shapes = {    
    I: {
      shapes: [
        [[1, 1, 1, 1]],
        [[1], [1], [1], [1]]
      ],
      color: colors.blue,
    },
    L: {
      shapes: [
        [[0, 0, 1], [1, 1, 1]],
        [[1, 0], [1, 0], [1, 1]],
        [[1, 1, 1], [1, 0, 0]],
        [[1, 1], [0, 1], [0, 1]]
      ],
      color: colors.green,
    },
    J: {
      shapes: [
        [[1, 0, 0], [1, 1, 1]],
        [[1, 1], [1, 0], [1, 0]],
        [[1, 1, 1], [0, 0, 1]],
        [[0, 1], [0, 1], [1, 1]]
      ],
      color: colors.red,
    },
    O: {
      shapes: [
        [[1, 1], [1, 1]]
      ],
      color: colors.pink,
    },
    Z: {
      shapes: [
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1], [1, 1], [1, 0]],
      ],
      color: colors.yellow,
    },
    S: {
      shapes: [
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0], [1, 1], [0, 1]],
      ],
      color: colors.orange,
    },
    T: {
      shapes: [
        [[0, 1, 0], [1, 1, 1]],
        [[1, 0], [1, 1], [1, 0]],
        [[1, 1, 1], [0, 1, 0]],
        [[0, 1], [1, 1], [0, 1]]
      ],
      color: colors.purple,
    },
  };
  
  export const getRandomShape = () => {
    const shapes = Object.keys(Shapes);
    const randShape = shapes[Math.floor(Math.random() * shapes.length)];
    return { ...Shapes[randShape], inicio: 0 };
  };