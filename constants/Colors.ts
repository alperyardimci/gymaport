/**
 * GYMAPORT Color System
 * Aviation-inspired premium dark theme
 */

export const Colors = {
  // Core backgrounds
  bg: {
    primary: '#0A0A0F',
    secondary: '#111118',
    tertiary: '#1A1A24',
    card: '#16161F',
    cardElevated: '#1E1E2A',
    input: '#1A1A24',
    overlay: 'rgba(10, 10, 15, 0.85)',
  },

  // Brand accents
  accent: {
    blue: '#00B4FF',
    blueDark: '#0080CC',
    blueLight: '#33C6FF',
    blueMuted: 'rgba(0, 180, 255, 0.15)',
    gold: '#FFD700',
    goldDark: '#CC9900',
    goldLight: '#FFE44D',
    goldMuted: 'rgba(255, 215, 0, 0.15)',
  },

  // Typography
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B8',
    tertiary: '#606075',
    disabled: '#404050',
    inverse: '#0A0A0F',
    accent: '#00B4FF',
    gold: '#FFD700',
    danger: '#FF4444',
    success: '#00CC88',
    warning: '#FFB800',
  },

  // Semantic colors
  status: {
    success: '#00CC88',
    successMuted: 'rgba(0, 204, 136, 0.15)',
    warning: '#FFB800',
    warningMuted: 'rgba(255, 184, 0, 0.15)',
    danger: '#FF4444',
    dangerMuted: 'rgba(255, 68, 68, 0.15)',
    info: '#00B4FF',
    infoMuted: 'rgba(0, 180, 255, 0.15)',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    default: 'rgba(255, 255, 255, 0.10)',
    strong: 'rgba(255, 255, 255, 0.20)',
    accent: 'rgba(0, 180, 255, 0.40)',
    gold: 'rgba(255, 215, 0, 0.40)',
  },

  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    strong: 'rgba(255, 255, 255, 0.12)',
    blue: 'rgba(0, 180, 255, 0.08)',
    gold: 'rgba(255, 215, 0, 0.08)',
  },

  // Muscle group colors (for body map)
  muscle: {
    priority: '#FF4444',
    balanced: '#00CC88',
    strong: '#00B4FF',
    unanalyzed: '#404050',
  },

  // Chart colors
  chart: {
    line1: '#00B4FF',
    line2: '#00CC88',
    line3: '#FFD700',
    area: 'rgba(0, 180, 255, 0.20)',
    grid: 'rgba(255, 255, 255, 0.05)',
  },

  // Gradients (as arrays for LinearGradient)
  gradient: {
    primary: ['#0A0A0F', '#111118'],
    card: ['#16161F', '#1A1A24'],
    accent: ['#00B4FF', '#0060AA'],
    gold: ['#FFD700', '#CC9900'],
    splash: ['#0A0A0F', '#0D1420', '#0A0A0F'],
    danger: ['#FF4444', '#CC0000'],
    success: ['#00CC88', '#009966'],
    blue_glow: ['rgba(0,180,255,0.3)', 'rgba(0,180,255,0)'],
  },
} as const;

export type ColorKey = keyof typeof Colors;
