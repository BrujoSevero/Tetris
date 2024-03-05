import { colors } from '../styles/colors';

export const pieces = {
  I: {
    shape: [
      [1, 1, 1, 1],
    ],
    color: colors.colors.blue,
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: colors.colors.red,
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: colors.colors.green,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: colors.colors.pink,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: colors.colors.orange,
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: colors.colors.purple,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: colors.colors.yellow,
  },
};