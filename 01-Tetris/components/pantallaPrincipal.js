
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import GameBoard from "./Tablero";


export default function PantallaPrincipal() {
  const [vista, setVista] = useState('inicio');
  
  return vista === 'inicio' ? (
    <View style={styles.container1}>
      <ImageBackground source={require("../assets/tetris2.gif")} style={{ height: "100%" }}>
        <View style={styles.container2}>
          <TouchableOpacity activeOpacity={1} style={styles.playTouchable} onPress={() => setVista('juego')}>
            <Text style={styles.playText}>PLAY</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  ) : (
    <GameBoard></GameBoard>
  )
}
const styles = StyleSheet.create({
  container1: {
    resizeMode: 'cover',
  },
  container2: {
    display: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  playTouchable: {
    width: 155,
    height: 90,
    backgroundColor: '#FF0093',
    opacity: .7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 45,
  },
});