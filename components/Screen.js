import { router } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function Screen({ title, children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar para Home"
          onPress={() => router.replace('/')}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export const screenStyles = StyleSheet.create({
  body: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    gap: 18,
  },
  message: {
    color: '#475C56',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  error: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#FCE9E5',
    color: '#9B3124',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8F6',
  },
  header: {
    minHeight: 68,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDE7E2',
  },
  backButton: {
    width: 96,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    color: '#126B5B',
    fontSize: 34,
    lineHeight: 38,
    marginRight: 6,
  },
  backText: {
    color: '#126B5B',
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    color: '#173B32',
    fontSize: 22,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 96,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    paddingBottom: 36,
  },
});