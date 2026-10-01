import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import Container from "../components/container";
import Botao from "../components/buttom";
import { Text, View, Image, Alert, TouchableOpacity, StyleSheet } from "react-native";




export default function Camera(){

const [foto, setFoto] = useState(null);
const [permission, requestPermission] = useCameraPermissions();
//const [status, requestPermission] = MediaLibrary.usePermissions();
//const [cameraReady, setCameraReady] = useState(false);
const cameraRef = useRef(null);


async function tirarFoto() {

    if(cameraRef.current){

const imagem = await cameraRef.current.takePictureAsync();


setFoto(imagem.uri);

console.log(imagem);

salvarGaleria(imagem.uri)

    }
    
}

async function salvarGaleria(uri) {
    
    await MediaLibrary.saveToLibraryAsync(uri);
   
    
}


if(!permission){

    return <View/>

}

if(!permission.granted){

    return(

        <Container>
            <Text>O aplicativo precisa de permissão para acessar a câmera</Text>
             <Botao
                txt="Permitir"
                onPress={requestPermission}
            />
        </Container>


    );


}if(foto){

 return(

<View style={{ flex:1, justifyContent:"center"}}>
    <View style={{height:"80%"}}>
    <Image source={{uri:foto}} style={{flex:1}} />
    </View>
    <View style={{height:"20%", justifyContent:"center", alignItems:"center"}}>
    <Botao txt={"Salvar"} onPress={()=>Alert.alert("Salvar", "Deseja Salvar essa Imagem na Galeria",[{text:"Cancelar", onPress:()=>console.log("cancelado"), style:'cancel'}, {text:'Salvar', onPress:()=>{salvarGaleria(),  alert("Salvo com Sucesso!"), setFoto(null)}, style:'default'}])}/>
    <Botao txt={"Voltar"} />
    </View>
</View>
)

}return(

    <CameraView style={{flex:1, alignItems:"center", justifyContent:"center"}} ref={cameraRef}>

        <TouchableOpacity style={style.btn} onPress={tirarFoto}/>

    </CameraView>


    )

    
}

const style = StyleSheet.create({

    btn:{

        height:80,
        width:80,
        backgroundColor:"#b91414",
        borderRadius:40,
        bottom:0,
        position:"absolute",
        marginBottom:50,
        borderWidth:3,
        borderColor:"#fff",
    }


})