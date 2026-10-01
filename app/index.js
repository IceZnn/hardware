import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const features = [
	{ title: 'Câmera', detail: 'Prévia e captura', icon: '◉', route: '/camera', color: '#E4EFE9' },
	{ title: 'Acelerômetro', detail: 'Inclinação ao vivo', icon: '⌁', route: '/acelerometro', color: '#F4EBD3' },
	{ title: 'GPS', detail: 'Sua posição atual', icon: '⌖', route: '/gps', color: '#E2EDF0' },
	{ title: 'Áudio', detail: 'Grave e reproduza', icon: '♫', route: '/audio', color: '#F3E4DF' },
	{ title: 'Notificação', detail: 'Lembrete em 5 s', icon: '◷', route: '/notification', color: '#E9E9DF' },
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
					<View style={styles.kicker}>
						<View style={styles.kickerDot} />
						<Text style={styles.eyebrow}>BANCADA MOBILE</Text>
					</View>
					<View style={styles.titleRow}>
						<Text style={styles.title}>Hardware</Text>
						<Text style={styles.count}>05 TESTES</Text>
					</View>
					<Text style={styles.description}>Câmera, sensores e áudio do tablet.</Text>
				</View>
				<View style={styles.grid}>
					{features.map((feature, index) => (
						<TouchableOpacity
							key={feature.route}
							accessibilityRole="button"
							onPress={() => openFeature(feature.route)}
							style={[styles.card, { backgroundColor: feature.color }]}
						>
							<View style={styles.cardTop}>
								<View style={styles.iconTile}><Text style={styles.icon}>{feature.icon}</Text></View>
								<Text style={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</Text>
							</View>
							<View style={styles.cardBottom}>
								<View style={styles.cardCopy}>
									<Text style={styles.cardTitle}>{feature.title}</Text>
									<Text style={styles.cardDetail}>{feature.detail}</Text>
								</View>
								<View style={styles.cardArrow}><Text style={styles.arrowText}>↗</Text></View>
							</View>
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
		backgroundColor: '#F1F4F0',
	},
	content: {
		flexGrow: 1,
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingTop: 34,
		paddingBottom: 36,
	},
	intro: {
		width: '100%',
		maxWidth: 940,
		marginBottom: 26,
	},
	kicker: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 9,
	},
	kickerDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#D26A45',
	},
	eyebrow: {
		color: '#126B5B',
		fontSize: 12,
		fontWeight: '800',
		letterSpacing: 0.6,
	},
	titleRow: {
		marginTop: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: '#19352F',
		fontSize: 40,
		fontWeight: '800',
	},
	count: {
		color: '#6A7D76',
		fontSize: 12,
		fontWeight: '800',
		letterSpacing: 0.4,
	},
	description: {
		maxWidth: 560,
		color: '#475C56',
		fontSize: 17,
		lineHeight: 24,
		marginTop: 4,
	},
	grid: {
		width: '100%',
		maxWidth: 940,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 16,
	},
	card: {
		flexGrow: 1,
		flexBasis: 245,
		minHeight: 178,
		borderRadius: 14,
		padding: 18,
		borderWidth: 1,
		borderColor: 'rgba(25, 53, 47, 0.07)',
		justifyContent: 'space-between',
	},
	cardTop: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	iconTile: {
		width: 48,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 14,
		backgroundColor: 'rgba(255, 255, 255, 0.68)',
	},
	icon: {
		color: '#19352F',
		fontSize: 27,
	},
	cardNumber: {
		color: 'rgba(25, 53, 47, 0.5)',
		fontSize: 12,
		fontWeight: '800',
		fontVariant: ['tabular-nums'],
	},
	cardBottom: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		gap: 10,
	},
	cardCopy: {
		flex: 1,
	},
	cardTitle: {
		color: '#19352F',
		fontSize: 20,
		fontWeight: '800',
	},
	cardDetail: {
		marginTop: 4,
		color: '#51645D',
		fontSize: 14,
	},
	cardArrow: {
		width: 34,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, 0.72)',
	},
	arrowText: {
		color: '#126B5B',
		fontSize: 20,
		fontWeight: '700',
	},
});