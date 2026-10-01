import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Accelerometer } from 'expo-sensors';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import Screen, { screenStyles } from '../components/Screen';

export default function Acelerometro() {
	const [values, setValues] = useState({ x: 0, y: 0, z: 0 });
	const [error, setError] = useState('');
	const [boardWidth, setBoardWidth] = useState(320);
	const { width } = useWindowDimensions();
	const size = Math.min(width - 64, 420);
	const dotOffset = (size - 28) / 2;
	const dotLeft = dotOffset + Math.max(-1, Math.min(1, values.x)) * (dotOffset - 12);
	const dotTop = dotOffset - Math.max(-1, Math.min(1, values.y)) * (dotOffset - 12);

	useFocusEffect(
		useCallback(() => {
			let subscription;
			let active = true;

			async function startSensor() {
				try {
					const available = await Accelerometer.isAvailableAsync();
					if (!available) {
						if (active) setError('Este tablet não tem acelerômetro.');
						return;
					}
					if (!active) return;
					setError('');
					Accelerometer.setUpdateInterval(100);
					subscription = Accelerometer.addListener(setValues);
				} catch {
					if (active) setError('Não consegui iniciar o sensor. Tente abrir a tela de novo.');
				}
			}

			startSensor();
			return () => {
				active = false;
				subscription?.remove();
			};
		}, [])
	);

	useEffect(() => {
		setBoardWidth(size);
	}, [size]);

	return (
		<Screen title="Acelerômetro">
			<View style={screenStyles.body}>
				<Text style={screenStyles.message}>Incline o tablet para mover a bolinha e mudar os valores.</Text>
				<View
					onLayout={(event) => setBoardWidth(event.nativeEvent.layout.width)}
					style={[styles.board, { width: Math.min(boardWidth, size), height: Math.min(boardWidth, size) }]}
				>
					<View style={[styles.ball, { left: dotLeft, top: dotTop }]} />
				</View>
				<View style={styles.values}>
					<Value label="X" value={values.x} />
					<Value label="Y" value={values.y} />
					<Value label="Z" value={values.z} />
				</View>
				{!!error && <Text style={screenStyles.error}>{error}</Text>}
			</View>
		</Screen>
	);
}

function Value({ label, value }) {
	return (
		<View style={styles.valueBox}>
			<Text style={styles.axis}>{label}</Text>
			<Text style={styles.number}>{value.toFixed(2)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	board: {
		maxWidth: 420,
		maxHeight: 420,
		alignSelf: 'center',
		position: 'relative',
		borderWidth: 2,
		borderColor: '#A9C7BC',
		borderRadius: 16,
		backgroundColor: '#E7F0EC',
	},
	ball: {
		position: 'absolute',
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: '#D26A45',
	},
	values: {
		flexDirection: 'row',
		gap: 12,
	},
	valueBox: {
		flex: 1,
		minHeight: 78,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
	},
	axis: {
		color: '#126B5B',
		fontSize: 14,
		fontWeight: '700',
	},
	number: {
		color: '#173B32',
		fontSize: 22,
		fontWeight: '700',
		fontVariant: ['tabular-nums'],
	},
});