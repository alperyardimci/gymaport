import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { Typography, BorderRadius, Spacing } from '@/constants/theme';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  style?: ViewStyle;
  animated?: boolean;
}

export function ProgressBar({
  progress,
  color = Colors.accent.blue,
  backgroundColor = Colors.bg.cardElevated,
  height = 8,
  showLabel = false,
  label,
  style,
  animated = true,
}: ProgressBarProps) {
  const width = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      width.value = withTiming(Math.min(Math.max(progress, 0), 100), { duration: 600 });
    } else {
      width.value = Math.min(Math.max(progress, 0), 100);
    }
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={[style]}>
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showLabel && <Text style={styles.percentage}>{Math.round(progress)}%</Text>}
        </View>
      )}
      <View style={[styles.track, { height, backgroundColor, borderRadius: height / 2 }]}>
        <Animated.View
          style={[
            styles.fill,
            animatedStyle,
            { height, backgroundColor: color, borderRadius: height / 2 },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
  fill: { position: 'absolute', left: 0, top: 0 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing[1] },
  label: { fontSize: Typography.size.xs, color: Colors.text.secondary, fontWeight: Typography.weight.medium },
  percentage: { fontSize: Typography.size.xs, color: Colors.accent.blue, fontWeight: Typography.weight.bold },
});
