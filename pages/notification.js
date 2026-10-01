import * as Notifications from 'expo-notifications';
import Container from '../components/container';
import Botao from '../components/buttom';
import { Alert } from 'react-native';

Notifications.setNotificationHandler({

    handleNotification: async()=>({

shouldShowBanner:true,
shouldShowList:true,
shouldPlaySound:true,
shouldSetBadge:false,
    })
})


export default function Notificacao(){


    async function Agendar() {

        const permissao = await Notifications.requestPermissionsAsync();

        if(!permissao.granted){

            Alert.alert("Permissão!", "Permita notificações para continuar!");

            return;
        } 
   

    await Notifications.scheduleNotificationAsync({

content:{

    title:"😘 Hora de Estudar!",
    body:"Continue Praticando React Native!"
    
}, 

trigger:{

    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds:10,
},

    })

    Alert.alert("Sucesso!", "Notificação agendada para 10 segundos!");

     }


return(

<Container>
    <Botao txt={"Agendar Notificação!"} onPress={Agendar} />
</Container>


)

}