import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking
} from 'react-native';

import * as Location from 'expo-location';

export default function Gps() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState("");

  async function localizar() {

    const permissao =
      await Location.requestForegroundPermissionsAsync();

      console.log(permissao)

    if (permissao.status !== "granted") {

      setStatus("Permissão negada");

      return;

    }

    const posicao =
      await Location.getCurrentPositionAsync({});

    setLatitude(posicao.coords.latitude);

    setLongitude(posicao.coords.longitude);

    setStatus("Localização encontrada");

  }

  function abrirMapa() {

    if (latitude && longitude) {

      const url =
        `https://www.google.com/maps?q=${latitude},${longitude}`;

      Linking.openURL(url);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Meu GPS
      </Text>

      <Text>
        Latitude:
      </Text>

      <Text>
        {latitude}
      </Text>

      <Text>
        Longitude:
      </Text>

      <Text>
        {longitude}
      </Text>

      <Text style={styles.status}>
        {status}
      </Text>

      <Button
        title="Buscar Localização"
        onPress={localizar}
      />

      <View style={{marginTop:20}}/>

      <Button
        title="Abrir no Google Maps"
        onPress={abrirMapa}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex:1,

    justifyContent:'center',

    alignItems:'center',

    padding:20

  },

  titulo:{

    fontSize:30,

    fontWeight:'bold',

    marginBottom:30

  },

  status:{

    margin:20,

    fontSize:20

  }

});