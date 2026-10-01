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
				<Text style={styles.intro}>Grave uma fala curta ou escolha um efeito.</Text>
				<View style={[styles.recorderPanel, recorderState.isRecording && styles.recorderPanelActive]}>
					<View style={[styles.dot, recorderState.isRecording && styles.dotRecording]} />
					<View style={styles.recorderCopy}>
						<Text style={styles.recorderCaption}>MICROFONE</Text>
						<Text style={styles.state}>{recorderState.isRecording ? 'Gravando' : 'Pronto para gravar'}</Text>
					</View>
					<Text style={styles.duration}>{formatDuration(recorderState.durationMillis)}</Text>
				</View>
				<View style={styles.actions}>
					<View style={styles.action}>
						<Botao txt="Gravar" disabled={recorderState.isRecording} onPress={startRecording} />
					</View>
					<View style={styles.action}>
						<Botao txt="Parar" secondary disabled={!recorderState.isRecording} onPress={stopRecording} />
					</View>
				</View>
				<Botao txt="Ouvir minha gravação" secondary disabled={!recordingUri || recorderState.isRecording} onPress={playRecording} />
				<View style={styles.presets}>
					<View style={styles.presetsHeading}>
						<Text style={styles.presetsTitle}>Efeitos</Text>
						<Text style={styles.presetsHint}>TOQUE PARA OUVIR</Text>
					</View>
					{presets.map((preset) => (
						<Botao
							key={preset.title}
							txt={`▶   ${preset.title}`}
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

function formatDuration(durationMillis) {
	const totalSeconds = Math.floor(durationMillis / 1000);
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
	const seconds = (totalSeconds % 60).toString().padStart(2, '0');
	return `${minutes}:${seconds}`;
}

const styles = StyleSheet.create({
	intro: {
		color: '#53675E',
		fontSize: 17,
		lineHeight: 24,
	},
	recorderPanel: {
		minHeight: 92,
		paddingHorizontal: 18,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		borderWidth: 1,
		borderColor: '#D3DED7',
		borderRadius: 14,
		backgroundColor: '#FFFFFF',
	},
	recorderPanelActive: {
		borderColor: '#D56448',
		backgroundColor: '#FFF4EF',
	},
	dot: {
		width: 13,
		height: 13,
		borderRadius: 7,
		backgroundColor: '#93A49D',
	},
	dotRecording: {
		backgroundColor: '#C44938',
	},
	recorderCopy: {
		flex: 1,
		gap: 3,
	},
	recorderCaption: {
		color: '#75857E',
		fontSize: 10,
		fontWeight: '800',
		letterSpacing: 0.5,
	},
	state: {
		color: '#19352F',
		fontSize: 18,
		fontWeight: '700',
	},
	duration: {
		minWidth: 58,
		color: '#19352F',
		fontSize: 21,
		fontWeight: '700',
		fontVariant: ['tabular-nums'],
		textAlign: 'right',
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
	presets: {
		gap: 10,
		marginTop: 8,
	},
	presetsHeading: {
		marginBottom: 2,
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-between',
	},
	message: {
		color: '#315D4F',
		fontSize: 16,
		textAlign: 'left',
	},
	presetsHint: {
		color: '#75857E',
		fontSize: 9,
		fontWeight: '800',
		letterSpacing: 0.45,
	},
	presetsTitle: {
		color: '#19352F',
		fontSize: 21,
		fontWeight: '700',
	},
});