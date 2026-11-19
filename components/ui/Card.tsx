import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing, Shadow } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'glass' | 'accent' | 'gold';
  padding?: number;
}

export function Card({ children, style, variant = 'default', padding = Spacing[4] }: CardProps) {
  if (variant === 'glass') {
    return (
      <BlurView intensity={20} tint="dark" style={[styles.glass, { padding }, style]}>
        {children}
      </BlurView>
    );
  }

  const variantStyle = {
    default: styles.default,
    elevated: styles.elevated,
    glass: styles.glass,
    accent: styles.accent,
    gold: styles.gold,
  }[variant];

  return (
    <View style={[styles.base, variantStyle, { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  elevated: {
    backgroundColor: Colors.bg.cardElevated,
    borderWidth: 1,
    borderColor: Colors.border.default,
    ...Shadow.md,
  },
  glass: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  accent: {
    backgroundColor: Colors.accent.blueMuted,
    borderWidth: 1,
    borderColor: Colors.border.accent,
  },
  gold: {
    backgroundColor: Colors.accent.goldMuted,
    borderWidth: 1,
    borderColor: Colors.border.gold,
  },
});
