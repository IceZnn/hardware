import { useState } from 'react';
import { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';
import { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';
import { setNotificationChannelAsync } from 'expo-notifications/build/setNotificationChannelAsync';
import { Text, View } from 'react-native';
import Botao from '../components/buttom';
import Screen, { screenStyles } from '../components/Screen';

export default function Notificacao() {
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [scheduling, setScheduling] = useState(false);

	async function scheduleNotification() {
		setScheduling(true);
		setMessage('');
		setError('');
		let stage = 'consultar permissão';
		try {
			try {
				await setNotificationChannelAsync('default', {
					name: 'Notificações locais',
					importance: AndroidImportance.DEFAULT,
				});
			} catch (channelError) {
				console.warn('Usando o canal padrão de notificações do Android.', channelError);
			}
			let permission = await getPermissionsAsync();
			if (!permission.granted) permission = await requestPermissionsAsync();
			if (!permission.granted) {
				setError('Notificações bloqueadas. Libere a permissão nas configurações do tablet.');
				return;
			}
			stage = 'agendar notificação';
			await scheduleNotificationAsync({
				content: {
					title: 'Lembrete de estudo',
					body: 'Sua notificação local de teste chegou.',
					sound: true,
				},
				trigger: {
					type: SchedulableTriggerInputTypes.TIME_INTERVAL,
					seconds: 5,
				},
			});
			setMessage('Notificação local agendada para daqui a 5 segundos.');
		} catch (cause) {
			const details = cause instanceof Error ? cause.message : String(cause);
				setError(`Deu erro ao ${stage}: ${details}`);
		} finally {
			setScheduling(false);
		}
	}

	return (
		<Screen title="Notificação">
			<View style={screenStyles.body}>
				<Text style={screenStyles.message}>A notificação aparece daqui a 5 segundos.</Text>
				<Botao txt={scheduling ? 'Agendando…' : 'Testar notificação'} disabled={scheduling} onPress={scheduleNotification} />
				{!!message && <Text style={{ ...screenStyles.message, color: '#126B5B' }}>Pronto. Veja se chegou.</Text>}
				{!!error && <Text style={screenStyles.error}>{error}</Text>}
			</View>
		</Screen>
	);
}