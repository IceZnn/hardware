import { useState } from 'react';
import * as Location from 'expo-location';
import { Linking, Text, View, StyleSheet } from 'react-native';
import Botao from '../components/buttom';
import Screen, { screenStyles } from '../components/Screen';

export default function Gps() {
	const [location, setLocation] = useState(null);
	const [status, setStatus] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function locate() {
		setLoading(true);
		setError('');
		setStatus('');
		try {
			const permission = await Location.requestForegroundPermissionsAsync();
			if (permission.status !== 'granted') {
				setError('Sem acesso à localização. Libere a permissão nas configurações do tablet.');
				return;
			}
			const result = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
			setLocation(result.coords);
			setStatus('Localização atualizada.');
		} catch {
			setError('Não consegui localizar. Confira se o GPS está ligado e tente de novo.');
		} finally {
			setLoading(false);
		}
	}

	async function openMap() {
		if (!location) return;
		const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
		try {
			await Linking.openURL(url);
		} catch {
			setError('Não consegui abrir o Google Maps.');
		}
	}

	return (
		<Screen title="GPS">
			<View style={screenStyles.body}>
				<Text style={screenStyles.message}>Toque para ver sua localização atual.</Text>
				<Botao txt={loading ? 'Buscando…' : 'Buscar localização'} disabled={loading} onPress={locate} />
				{location && (
					<View style={styles.data}>
						<Coordinate label="Latitude" value={location.latitude} />
						<Coordinate label="Longitude" value={location.longitude} />
						<Coordinate label="Precisão" value={`${Math.round(location.accuracy ?? 0)} m`} />
					</View>
				)}
				{!!status && <Text style={styles.status}>Localização encontrada.</Text>}
				{!!error && <Text style={screenStyles.error}>{error}</Text>}
				<Botao txt="Abrir no Google Maps" secondary disabled={!location} onPress={openMap} />
			</View>
		</Screen>
	);
}

function Coordinate({ label, value }) {
	return (
		<View style={styles.row}>
			<Text style={styles.label}>{label}</Text>
			<Text selectable style={styles.value}>{typeof value === 'number' ? value.toFixed(6) : value}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	data: {
		paddingHorizontal: 18,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
	},
	row: {
		minHeight: 66,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#E2EBE6',
	},
	label: {
		color: '#475C56',
		fontSize: 17,
		fontWeight: '600',
	},
	value: {
		flexShrink: 1,
		color: '#173B32',
		fontSize: 17,
		fontWeight: '700',
		textAlign: 'right',
		fontVariant: ['tabular-nums'],
	},
	status: {
		color: '#126B5B',
		fontSize: 16,
		textAlign: 'center',
	},
});