import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const features = [
	{ title: 'Câmera', icon: '📷', route: '/camera', color: '#D9EEE7' },
	{ title: 'Acelerômetro', icon: '◉', route: '/acelerometro', color: '#F5E9C8' },
	{ title: 'GPS', icon: '⌖', route: '/gps', color: '#DCEAF4' },
	{ title: 'Áudio', icon: '♫', route: '/audio', color: '#F4DFD8' },
	{ title: 'Notificação', icon: '♧', route: '/notification', color: '#E9E2F1' },
];

export default function Home() {
	function openFeature(route) {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
		router.push(route);
	}

	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.intro}>
					<Text style={styles.eyebrow}>PROJETO DE MOBILE</Text>
					<Text style={styles.title}>Hardware</Text>
					<Text style={styles.description}>
						Use a câmera, incline o tablet e teste os sensores.
					</Text>
				</View>
				<View style={styles.grid}>
					{features.map((feature) => (
						<TouchableOpacity
							key={feature.route}
							accessibilityRole="button"
							onPress={() => openFeature(feature.route)}
							style={[styles.card, { backgroundColor: feature.color }]}
						>
							<Text style={styles.icon}>{feature.icon}</Text>
							<Text style={styles.cardTitle}>{feature.title}</Text>
							<Text style={styles.cardArrow}>Abrir  ›</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F8F6',
	},
	content: {
		flexGrow: 1,
		alignItems: 'center',
		paddingHorizontal: 28,
		paddingTop: 42,
		paddingBottom: 32,
	},
	intro: {
		width: '100%',
		maxWidth: 900,
		marginBottom: 30,
	},
	eyebrow: {
		color: '#126B5B',
		fontSize: 13,
		fontWeight: '800',
		letterSpacing: 1,
	},
	title: {
		color: '#173B32',
		fontSize: 42,
		fontWeight: '800',
		marginTop: 8,
	},
	description: {
		maxWidth: 560,
		color: '#475C56',
		fontSize: 19,
		lineHeight: 27,
		marginTop: 8,
	},
	grid: {
		width: '100%',
		maxWidth: 900,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 16,
	},
	card: {
		flexGrow: 1,
		flexBasis: 220,
		minHeight: 168,
		borderRadius: 12,
		padding: 22,
		justifyContent: 'space-between',
	},
	icon: {
		color: '#173B32',
		fontSize: 32,
	},
	cardTitle: {
		color: '#173B32',
		fontSize: 22,
		fontWeight: '800',
	},
	cardArrow: {
		color: '#126B5B',
		fontSize: 16,
		fontWeight: '700',
	},
});