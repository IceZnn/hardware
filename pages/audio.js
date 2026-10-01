import { useAudioPlayer } from "expo-audio";
import Botao from "../components/buttom";
import Container from "../components/container";


const audioSource = require("../assets/bolinha.mp3")

export default function Audio(){

    const player = useAudioPlayer(audioSource);
return(

   <Container>    
    <Botao txt={"Player"} onPress={()=>{player.seekTo(0); player.play()}}/>
    </Container>
)

}