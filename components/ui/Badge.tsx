import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography, BorderRadius, Spacing } from '@/constants/theme';

type BadgeVariant = 'default' | 'accent' | 'gold' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  small?: boolean;
}

export function Badge({ label, variant = 'default', style, small = false }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, { container: ViewStyle; text: { color: string } }> = {
    default: { container: { backgroundColor: Colors.bg.cardElevated, borderWidth: 1, borderColor: Colors.border.default }, text: { color: Colors.text.secondary } },
    accent: { container: { backgroundColor: Colors.accent.blueMuted, borderWidth: 1, borderColor: Colors.border.accent }, text: { color: Colors.accent.blue } },
    gold: { container: { backgroundColor: Colors.accent.goldMuted, borderWidth: 1, borderColor: Colors.border.gold }, text: { color: Colors.accent.gold } },
    success: { container: { backgroundColor: Colors.status.successMuted, borderWidth: 1, borderColor: Colors.status.success }, text: { color: Colors.status.success } },
    warning: { container: { backgroundColor: Colors.status.warningMuted, borderWidth: 1, borderColor: Colors.status.warning }, text: { color: Colors.status.warning } },
    danger: { container: { backgroundColor: Colors.status.dangerMuted, borderWidth: 1, borderColor: Colors.status.danger }, text: { color: Colors.status.danger } },
    outline: { container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.border.default }, text: { color: Colors.text.secondary } },
  };

  const v = variantStyles[variant];

  return (
    <View style={[styles.base, small && styles.small, v.container, style]}>
      <Text style={[styles.text, small && styles.smallText, v.text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1],
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
  },
  text: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    letterSpacing: Typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
  smallText: {
    fontSize: 10,
  },
});
