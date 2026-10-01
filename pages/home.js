import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Botao from '../components/buttom';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View  style={{flexDirection:"row", width:"100%", justifyContent:"space-around"}}>
      <View style={{justifyContent:"center",  alignItems:"center", backgroundColor:"#404040", width:"45%", height:200}}>
<Botao txt={"Áudio"} onPress={()=>navigation.navigate("Audio")}/>
<Botao txt={"Câmera"} onPress={()=>navigation.navigate("Camera")}/>
      </View>
      <View style={{justifyContent:"center", alignItems:"center", backgroundColor:"#404040", width:"45%", height:200}}>
<Botao txt={"Acelerômetro"} onPress={()=>navigation.navigate("Acelerometro")}/>
<Botao txt={"GPS"} onPress={()=>navigation.navigate("Gps")}/>
      </View>      
    </View>
    <View style={{justifyContent:"center", alignItems:"center", backgroundColor:"#404040", width:"80%", marginTop:20, borderRadius:10}}>
<Botao txt={"notificação!"} onPress={()=>navigation.navigate("Notificacao")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
