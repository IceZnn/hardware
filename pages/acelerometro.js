import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function Acelerometro({navigation}) {

  const [dados, setDados] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  useEffect(() => {

    Accelerometer.setUpdateInterval(100);

    const inscricao = Accelerometer.addListener((acelerometro) => {
      setDados(acelerometro);
    });

    return () => {
      inscricao.remove();
    };

  }, []);

  const left = 140 + dados.x * 80;
  const top = 140 - dados.y * 80;

  const nivelado =
    Math.abs(dados.x) < 0.05 &&
    Math.abs(dados.y) < 0.05;

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Nível Digital
      </Text>

      <View style={styles.quadro}>

        <View
          style={[
            styles.bola,
            {
              left,
              top,
              backgroundColor: nivelado ? "green" : "red"
            }
          ]}
        />

      </View>

      <Text style={styles.status}>
        {nivelado ? "✅ Nivelado" : "⚠️ Fora do nível"}
      </Text>

      <Text>X: {dados.x.toFixed(2)}</Text>
      <Text>Y: {dados.y.toFixed(2)}</Text>
      <Text>Z: {dados.z.toFixed(2)}</Text>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },

  quadro: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: 'black',
    position: 'relative',
    backgroundColor: '#DDD'
  },

  bola: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute'
  },

  status: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 20
  }

});