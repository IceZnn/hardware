import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function Botao({ txt, onPress, disabled = false, secondary = false }) {
    function handlePress() {
        if (disabled) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress?.();
    }

    return (
        <TouchableOpacity
            accessibilityRole="button"
            disabled={disabled}
            onPress={handlePress}
            style={[styles.button, secondary && styles.secondary, disabled && styles.disabled]}
        >
            <Text style={[styles.label, secondary && styles.secondaryLabel]}>{txt}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 54,
        paddingHorizontal: 22,
        borderRadius: 12,
        backgroundColor: '#126B5B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondary: {
        backgroundColor: '#E4F1ED',
        borderWidth: 1,
        borderColor: '#B7D5CC',
    },
    disabled: {
        opacity: 0.45,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    secondaryLabel: {
        color: '#126B5B',
    },
});