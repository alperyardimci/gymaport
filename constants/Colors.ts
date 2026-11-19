/**
 * GYMAPORT Color System
 * Aviation-inspired premium dark theme — Navy + Amber Gold
 */

export const Colors = {
  // Core backgrounds — deep navy blue
  bg: {
    primary: '#0A0E1A',
    secondary: '#0D1526',
    tertiary: '#131D33',
    card: '#0F1B30',
    cardElevated: '#162035',
    input: '#0D1830',
    overlay: 'rgba(10, 14, 26, 0.88)',
  },

  // Brand accents
  accent: {
    blue: '#1E90FF',
    blueDark: '#0060CC',
    blueLight: '#5BB0FF',
    blueMuted: 'rgba(30, 144, 255, 0.15)',
    gold: '#FFB800',
    goldDark: '#CC8800',
    goldLight: '#FFD04D',
    goldMuted: 'rgba(255, 184, 0, 0.18)',
    goldGlow: 'rgba(255, 184, 0, 0.35)',
  },

  // Typography
  text: {
    primary: '#FFFFFF',
    secondary: '#A8B4CC',
    tertiary: '#5A6880',
    disabled: '#3A4458',
    inverse: '#0A0E1A',
    accent: '#1E90FF',
    gold: '#FFB800',
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
    info: '#1E90FF',
    infoMuted: 'rgba(30, 144, 255, 0.15)',
    error: '#FF4444',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.07)',
    default: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.22)',
    accent: 'rgba(30, 144, 255, 0.40)',
    gold: 'rgba(255, 184, 0, 0.45)',
  },

  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    strong: 'rgba(255, 255, 255, 0.12)',
    blue: 'rgba(30, 144, 255, 0.08)',
    gold: 'rgba(255, 184, 0, 0.08)',
  },

  // Muscle group colors (for body map)
  muscle: {
    priority: '#FF4444',
    balanced: '#00CC88',
    strong: '#1E90FF',
    unanalyzed: '#3A4458',
  },

  // Chart colors
  chart: {
    line1: '#1E90FF',
    line2: '#00CC88',
    line3: '#FFB800',
    area: 'rgba(30, 144, 255, 0.20)',
    grid: 'rgba(255, 255, 255, 0.05)',
  },

  // Gradients (as arrays for LinearGradient)
  gradient: {
    primary: ['#0A0E1A', '#0D1526'],
    card: ['#0F1B30', '#131D33'],
    accent: ['#1E90FF', '#0060CC'],
    gold: ['#FFB800', '#CC7700'],
    goldButton: ['#FFB800', '#E8930A'],
    sky: ['#0A1428', '#102040', '#1A3060', '#0D1526'],
    skyHero: ['#0D1A3A', '#1A3060', '#2B4E8C', '#1A3060', '#0A0E1A'],
    splash: ['#0A0E1A', '#0D1A3A', '#0A0E1A'],
    danger: ['#FF4444', '#CC0000'],
    success: ['#00CC88', '#009966'],
    gold_glow: ['rgba(255,184,0,0.5)', 'rgba(255,184,0,0)'],
  },
} as const;

export type ColorKey = keyof typeof Colors;
