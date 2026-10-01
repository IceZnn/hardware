import { useState } from 'react';
import {
	AudioModule,
	RecordingPresets,
	setAudioModeAsync,
	useAudioPlayer,
	useAudioRecorder,
	useAudioRecorderState,
} from 'expo-audio';
import { Text, View, StyleSheet } from 'react-native';
import Botao from '../components/buttom';
import Screen, { screenStyles } from '../components/Screen';

const presets = [
	{ title: 'Explosão', source: require('../assets/explosion.mp3') },
	{ title: 'Boing', source: require('../assets/cartoon-boing.mp3') },
	{ title: 'Bip curto', source: require('../assets/short-beep.wav') },
];

export default function Audio() {
	const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
	const recorderState = useAudioRecorderState(recorder);
	const player = useAudioPlayer(null);
	const [recordingUri, setRecordingUri] = useState(null);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	async function startRecording() {
		setError('');
		setMessage('');
		try {
			const permission = await AudioModule.requestRecordingPermissionsAsync();
			if (!permission.granted) {
				setError('A permissão do microfone foi negada. Ative-a nas configurações do tablet para gravar.');
				return;
			}
			player.pause();
			await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
			await recorder.prepareToRecordAsync();
			recorder.record();
			setMessage('Gravação iniciada.');
		} catch {
			setError('Não foi possível iniciar a gravação. Verifique se o microfone está disponível.');
		}
	}

	async function stopRecording() {
		setError('');
		try {
			await recorder.stop();
			const uri = recorder.uri;
			if (!uri) {
				setError('A gravação terminou, mas o arquivo não ficou disponível. Tente gravar novamente.');
				return;
			}
			setRecordingUri(uri);
			setMessage('Gravação pronta para reproduzir.');
			await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
		} catch {
			setError('Não foi possível finalizar a gravação. Tente novamente.');
		}
	}

	async function playRecording() {
		if (!recordingUri) return;
		setError('');
		try {
			await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
			player.replace(recordingUri);
			await player.seekTo(0);
			player.play();
			setMessage('Reproduzindo gravação.');
		} catch {
			setError('Não foi possível reproduzir a gravação. Grave um novo áudio e tente novamente.');
		}
	}

	async function playPreset(preset) {
		setError('');
		try {
			await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
			player.replace(preset.source);
			player.play();
			setMessage(`Tocando: ${preset.title}.`);
		} catch {
			setError('Não consegui tocar esse efeito. Tente de novo.');
		}
	}

	return (
		<Screen title="Áudio">
			<View style={screenStyles.body}>
				<Text style={screenStyles.message}>Grave sua voz ou teste um dos sons abaixo.</Text>
				<View style={styles.indicator}>
					<View style={[styles.dot, recorderState.isRecording && styles.dotRecording]} />
					<Text style={styles.state}>{recorderState.isRecording ? 'Gravando…' : 'Parado'}</Text>
				</View>
				<Text style={styles.duration}>
					{recorderState.isRecording ? `${Math.floor(recorderState.durationMillis / 1000)} s` : ' '}
				</Text>
				<View style={styles.actions}>
					<View style={styles.action}>
						<Botao txt="Gravar" disabled={recorderState.isRecording} onPress={startRecording} />
					</View>
					<View style={styles.action}>
						<Botao txt="Parar" secondary disabled={!recorderState.isRecording} onPress={stopRecording} />
					</View>
					<View style={styles.action}>
						<Botao txt="Ouvir gravação" secondary disabled={!recordingUri || recorderState.isRecording} onPress={playRecording} />
					</View>
				</View>
				<View style={styles.presets}>
					<Text style={styles.presetsTitle}>Efeitos prontos</Text>
					{presets.map((preset) => (
						<Botao
							key={preset.title}
							txt={preset.title}
							secondary
							disabled={recorderState.isRecording}
							onPress={() => playPreset(preset)}
						/>
					))}
				</View>
				{!!message && <Text style={styles.message}>{message}</Text>}
				{!!error && <Text style={screenStyles.error}>{error}</Text>}
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	indicator: {
		minHeight: 86,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 12,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
	},
	dot: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: '#93A49D',
	},
	dotRecording: {
		backgroundColor: '#C44938',
	},
	state: {
		color: '#173B32',
		fontSize: 20,
		fontWeight: '700',
	},
	duration: {
		color: '#475C56',
		minHeight: 22,
		fontSize: 16,
		textAlign: 'center',
	},
	actions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	action: {
		flexGrow: 1,
		flexBasis: 180,
	},
	message: {
		color: '#126B5B',
		fontSize: 16,
		textAlign: 'center',
	},
	presets: {
		gap: 10,
	},
	presetsTitle: {
		color: '#173B32',
		fontSize: 20,
		fontWeight: '700',
	},
});