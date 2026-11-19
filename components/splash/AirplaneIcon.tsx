import React from 'react';
import Svg, { Path, Ellipse, Circle, G } from 'react-native-svg';

interface AirplaneIconProps {
  size?: number;
  color?: string;
  accentColor?: string;
}

export function AirplaneIcon({ size = 80, color = '#00B4FF', accentColor = '#FFD700' }: AirplaneIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Main fuselage */}
      <Path
        d="M50 15 C55 15, 72 25, 85 50 C72 75, 55 85, 50 85 C45 85, 28 75, 15 50 C28 25, 45 15, 50 15Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.3"
      />

      {/* Airplane body */}
      <Path
        d="M20 50 L70 42 L85 50 L70 58 L20 50Z"
        fill={color}
        opacity="0.9"
      />

      {/* Cockpit nose */}
      <Path
        d="M70 46 L90 50 L70 54Z"
        fill={color}
      />

      {/* Top wing */}
      <Path
        d="M45 48 L60 25 L65 27 L52 48Z"
        fill={color}
        opacity="0.85"
      />

      {/* Bottom wing */}
      <Path
        d="M45 52 L60 75 L65 73 L52 52Z"
        fill={color}
        opacity="0.85"
      />

      {/* Tail fin */}
      <Path
        d="M22 48 L15 36 L18 36 L25 48Z"
        fill={color}
        opacity="0.7"
      />
      <Path
        d="M22 52 L15 64 L18 64 L25 52Z"
        fill={color}
        opacity="0.7"
      />

      {/* Engine 1 (left top) - subtle dumbbell shape */}
      <G opacity="0.8">
        <Ellipse cx="52" cy="38" rx="5" ry="2.5" fill={accentColor} />
        <Path d="M49 37 L49 39" stroke={accentColor} strokeWidth="1" />
        <Path d="M55 37 L55 39" stroke={accentColor} strokeWidth="1" />
      </G>

      {/* Engine 2 (left bottom) */}
      <G opacity="0.8">
        <Ellipse cx="52" cy="62" rx="5" ry="2.5" fill={accentColor} />
        <Path d="M49 61 L49 63" stroke={accentColor} strokeWidth="1" />
        <Path d="M55 61 L55 63" stroke={accentColor} strokeWidth="1" />
      </G>

      {/* Cockpit window */}
      <Circle cx="78" cy="50" r="2.5" fill="#FFFFFF" opacity="0.8" />

      {/* Flight path dots */}
      <Circle cx="12" cy="50" r="1.5" fill={color} opacity="0.4" />
      <Circle cx="6" cy="50" r="1" fill={color} opacity="0.2" />
    </Svg>
  );
}
