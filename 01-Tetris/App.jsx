import { StyleSheet, Text, View } from 'react-native';
import TetrisGame from './components/Tetris';

export default function App() {
  return (
    <View style={styles.container}>
      <TetrisGame></TetrisGame>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
