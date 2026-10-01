import { useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import Botao from '../components/buttom';
import Screen, { screenStyles } from '../components/Screen';

export default function Camera() {
	const [permission, requestPermission] = useCameraPermissions();
	const [facing, setFacing] = useState('back');
	const [photoUri, setPhotoUri] = useState(null);
	const [cameraReady, setCameraReady] = useState(false);
	const [error, setError] = useState('');
	const cameraRef = useRef(null);
	const { width } = useWindowDimensions();
	const previewHeight = Math.min(390, Math.max(240, width * 0.48));

	async function takePhoto() {
		if (!cameraRef.current || !cameraReady) return;
		try {
			setError('');
			const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
			setPhotoUri(photo.uri);
		} catch {
			setError('Não consegui tirar a foto. Veja se outro app está usando a câmera e tente de novo.');
		}
	}

	return (
		<Screen title="Câmera">
			<View style={screenStyles.body}>
				{!permission?.granted ? (
					<View style={styles.permissionPanel}>
						<Text style={screenStyles.message}>Libere a câmera para abrir a prévia e tirar uma foto.</Text>
						<Botao txt="Liberar câmera" onPress={requestPermission} />
					</View>
				) : (
					<>
						<View style={[styles.preview, { height: previewHeight }]}>
							<CameraView
								ref={cameraRef}
								style={StyleSheet.absoluteFill}
								facing={facing}
								onCameraReady={() => setCameraReady(true)}
								onMountError={() => setError('A câmera não abriu. Confira se outro app está usando e tente de novo.')}
							/>
						</View>
						<View style={styles.actions}>
							<View style={styles.action}>
								<Botao
									txt="Alternar câmera"
									secondary
									onPress={() => setFacing((current) => current === 'back' ? 'front' : 'back')}
								/>
							</View>
							<View style={styles.action}>
								<Botao txt="Tirar foto" disabled={!cameraReady} onPress={takePhoto} />
							</View>
						</View>
						{photoUri ? (
							<View style={styles.photoSection}>
								<Text style={styles.photoTitle}>Última foto</Text>
								<Image source={{ uri: photoUri }} style={styles.photo} resizeMode="contain" />
							</View>
						) : (
							<Text style={screenStyles.message}>Sua foto aparece aqui.</Text>
						)}
					</>
				)}
				{!!error && <Text style={screenStyles.error}>{error}</Text>}
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	preview: {
		width: '100%',
		maxWidth: 720,
		alignSelf: 'center',
		overflow: 'hidden',
		borderRadius: 10,
		backgroundColor: '#13251F',
	},
	permissionPanel: {
		width: '100%',
		alignItems: 'center',
		gap: 16,
	},
	actions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	action: {
		flexGrow: 1,
		flexBasis: 220,
	},
	photoSection: {
		gap: 10,
	},
	photoTitle: {
		color: '#173B32',
		fontSize: 20,
		fontWeight: '700',
	},
	photo: {
		width: '100%',
		height: 300,
		borderRadius: 10,
		backgroundColor: '#E4ECE8',
	},
});