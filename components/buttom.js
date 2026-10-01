import { TouchableOpacity, Text, StyleSheet } from "react-native";


export default function Botao({txt, onPress}){
    return(


        <TouchableOpacity onPress={onPress} style={style.btn}><Text style={style.txt}>{txt}</Text></TouchableOpacity>



    )
}
//a
const style = StyleSheet.create({

btn:{
    width:"80%",
    height:50,
    backgroundColor:"#404040",
    borderWidth:1,
    borderColor:"#bc2525",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    margin:10,


},
txt:{
    fontSize:20,
    color:"#fff"
}

})