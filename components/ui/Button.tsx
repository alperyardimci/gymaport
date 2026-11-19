import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { Typography, BorderRadius, Spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  haptic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  haptic = true,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const handlePress = () => {
    if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        style={[styles.base, styles[size], fullWidth && styles.fullWidth, isDisabled && styles.disabled, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isDisabled ? ['#2A2A3A', '#1E1E2A'] : [Colors.accent.blue, Colors.accent.blueDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, styles[size]]}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              {leftIcon}
              <Text style={[styles.text, styles[`${size}Text`], isDisabled && styles.disabledText, textStyle]}>
                {title}
              </Text>
              {rightIcon}
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'gold') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        style={[styles.base, styles[size], fullWidth && styles.fullWidth, isDisabled && styles.disabled, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isDisabled ? ['#2A2A3A', '#1E1E2A'] : [Colors.accent.gold, Colors.accent.goldDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, styles[size]]}
        >
          {loading ? (
            <ActivityIndicator color="#000000" size="small" />
          ) : (
            <>
              {leftIcon}
              <Text style={[styles.text, styles[`${size}Text`], { color: '#000000' }, isDisabled && styles.disabledText, textStyle]}>
                {title}
              </Text>
              {rightIcon}
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyles: Record<string, ViewStyle> = {
    secondary: { backgroundColor: Colors.bg.cardElevated, borderWidth: 1, borderColor: Colors.border.default },
    outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.accent.blue },
    ghost: { backgroundColor: 'transparent' },
    danger: { backgroundColor: Colors.status.dangerMuted, borderWidth: 1, borderColor: Colors.status.danger },
  };

  const variantTextStyles: Record<string, TextStyle> = {
    secondary: { color: Colors.text.primary },
    outline: { color: Colors.accent.blue },
    ghost: { color: Colors.text.secondary },
    danger: { color: Colors.status.danger },
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[size],
        fullWidth && styles.fullWidth,
        variantStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={Colors.text.primary} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text style={[styles.text, styles[`${size}Text`], variantTextStyles[variant], isDisabled && styles.disabledText, textStyle]}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  sm: { height: 36, paddingHorizontal: Spacing[4] },
  md: { height: 48, paddingHorizontal: Spacing[5] },
  lg: { height: 56, paddingHorizontal: Spacing[6] },
  text: {
    color: Colors.text.primary,
    fontWeight: Typography.weight.semibold,
    letterSpacing: Typography.letterSpacing.wide,
  },
  smText: { fontSize: Typography.size.sm },
  mdText: { fontSize: Typography.size.base },
  lgText: { fontSize: Typography.size.md },
  disabledText: { color: Colors.text.disabled },
});
