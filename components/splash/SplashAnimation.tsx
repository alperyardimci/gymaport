import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/theme';
import { AirplaneIcon } from './AirplaneIcon';

const { width, height } = Dimensions.get('window');

interface SplashAnimationProps {
  onComplete: () => void;
}

export function SplashAnimation({ onComplete }: SplashAnimationProps) {
  // Airplane animation values
  const airplaneX = useSharedValue(-120);
  const airplaneY = useSharedValue(height * 0.1);
  const airplaneScale = useSharedValue(0.5);
  const airplaneOpacity = useSharedValue(0);

  // Tunnel / streak values
  const streakOpacity = useSharedValue(0);
  const streakScale = useSharedValue(0.3);

  // Logo animation values
  const logoOpacity = useSharedValue(0);
  const logoY = useSharedValue(30);
  const logoScale = useSharedValue(0.8);

  // Tagline animation
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(20);

  useEffect(() => {
    // Phase 1: Airplane flies in from left
    airplaneOpacity.value = withTiming(1, { duration: 300 });
    airplaneX.value = withTiming(width / 2 - 40, { duration: 800, easing: Easing.out(Easing.cubic) });
    airplaneY.value = withTiming(height * 0.35, { duration: 800, easing: Easing.out(Easing.cubic) });
    airplaneScale.value = withTiming(1.5, { duration: 800 });

    // Phase 2: Streaks/tunnel effect
    streakOpacity.value = withDelay(700, withTiming(1, { duration: 300 }));
    streakScale.value = withDelay(700, withTiming(1, { duration: 400 }));

    // Phase 3: Airplane zooms into screen (transform tunnel)
    setTimeout(() => {
      airplaneScale.value = withTiming(6, { duration: 600, easing: Easing.in(Easing.cubic) });
      airplaneOpacity.value = withTiming(0, { duration: 600 });
      streakOpacity.value = withTiming(0, { duration: 400 });
    }, 1200);

    // Phase 4: Logo reveal
    setTimeout(() => {
      logoOpacity.value = withSpring(1, { damping: 15, stiffness: 80 });
      logoY.value = withSpring(0, { damping: 15, stiffness: 80 });
      logoScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    }, 1600);

    // Phase 5: Tagline
    setTimeout(() => {
      taglineOpacity.value = withTiming(1, { duration: 600 });
      taglineY.value = withTiming(0, { duration: 600 });
    }, 2000);

    // Complete
    setTimeout(() => {
      runOnJS(onComplete)();
    }, 3200);
  }, []);

  const airplaneStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: airplaneX.value,
    top: airplaneY.value,
    opacity: airplaneOpacity.value,
    transform: [{ scale: airplaneScale.value }],
  }));

  const streakStyle = useAnimatedStyle(() => ({
    opacity: streakOpacity.value,
    transform: [{ scale: streakScale.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoY.value }, { scale: logoScale.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));

  return (
    <LinearGradient
      colors={[Colors.bg.primary, '#0D1420', Colors.bg.primary]}
      style={styles.container}
    >
      {/* Background stars/particles */}
      <View style={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
              },
            ]}
          />
        ))}
      </View>

      {/* Streak effect */}
      <Animated.View style={[styles.streakContainer, streakStyle]}>
        {[...Array(8)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.streak,
              {
                transform: [{ rotate: `${i * 22.5}deg` }],
                opacity: 0.15 - i * 0.015,
              },
            ]}
          />
        ))}
      </Animated.View>

      {/* Airplane */}
      <Animated.View style={airplaneStyle}>
        <AirplaneIcon size={80} color={Colors.accent.blue} accentColor={Colors.accent.gold} />
      </Animated.View>

      {/* Logo & Branding */}
      <Animated.View style={[styles.brandContainer, logoStyle]}>
        {/* Logo icon */}
        <View style={styles.logoIconContainer}>
          <AirplaneIcon size={56} color={Colors.accent.blue} accentColor={Colors.accent.gold} />
        </View>

        <Text style={styles.appName}>GYMAPORT</Text>

        <Animated.View style={taglineStyle}>
          <Text style={styles.slogan}>YOUR BODY. YOUR FLIGHT.</Text>
          <Text style={styles.tagline}>Take off to your strongest self.</Text>
        </Animated.View>
      </Animated.View>

      {/* Bottom flight path line */}
      <Animated.View style={[styles.flightPath, taglineStyle]}>
        <View style={styles.flightLine} />
        <View style={[styles.flightDot, styles.flightDotLeft]} />
        <View style={[styles.flightDot, styles.flightDotRight]} />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg.primary,
  },
  particles: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    backgroundColor: Colors.accent.blue,
    borderRadius: 99,
  },
  streakContainer: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streak: {
    position: 'absolute',
    width: 2,
    height: width * 1.2,
    backgroundColor: Colors.accent.blue,
    borderRadius: 1,
  },
  brandContainer: {
    alignItems: 'center',
    gap: 12,
  },
  logoIconContainer: {
    marginBottom: 8,
  },
  appName: {
    fontSize: Typography.size['5xl'],
    fontWeight: Typography.weight.black,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.widest,
    textAlign: 'center',
  },
  slogan: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.accent.blue,
    letterSpacing: Typography.letterSpacing.caps,
    textAlign: 'center',
    marginTop: 4,
  },
  tagline: {
    fontSize: Typography.size.sm,
    color: Colors.text.secondary,
    letterSpacing: Typography.letterSpacing.wide,
    textAlign: 'center',
    marginTop: 6,
  },
  flightPath: {
    position: 'absolute',
    bottom: 60,
    width: width * 0.6,
    alignItems: 'center',
  },
  flightLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.accent.blue,
    opacity: 0.3,
  },
  flightDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent.blue,
    top: -2.5,
  },
  flightDotLeft: { left: 0 },
  flightDotRight: { right: 0 },
});
