import { View, StyleSheet } from "react-native";


export default function Container({children}){
    return(

<View style={style.const}>
    {children}
</View>


    )
}

const style = StyleSheet.create({

const:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",

}


})