import React from 'react';
import Svg, {
  Path, Ellipse, Circle, G, Defs, RadialGradient, Stop, LinearGradient as SvgLinear,
  Rect, Line,
} from 'react-native-svg';

interface HeroPlaneProps {
  width?: number;
  height?: number;
}

/**
 * Front-facing airplane with barbell-dumbbell engines.
 * Matches the GYMAPORT brand visual.
 */
export function HeroPlane({ width = 340, height = 240 }: HeroPlaneProps) {
  const scale = width / 340;

  return (
    <Svg width={width} height={height} viewBox="0 0 340 240" fill="none">
      <Defs>
        {/* Fuselage gradient */}
        <SvgLinear id="fuse_grad" x1="150" y1="10" x2="190" y2="210" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#D0D8E8" />
          <Stop offset="0.5" stopColor="#8898B8" />
          <Stop offset="1" stopColor="#4A5570" />
        </SvgLinear>

        {/* Wing gradient */}
        <SvgLinear id="wing_grad_l" x1="170" y1="100" x2="20" y2="180" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#8898B8" />
          <Stop offset="1" stopColor="#2A3448" />
        </SvgLinear>
        <SvgLinear id="wing_grad_r" x1="170" y1="100" x2="320" y2="180" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#8898B8" />
          <Stop offset="1" stopColor="#2A3448" />
        </SvgLinear>

        {/* Engine glow */}
        <RadialGradient id="glow_l" cx="68" cy="168" r="30" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#FFB800" stopOpacity="0.7" />
          <Stop offset="0.5" stopColor="#FF7700" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#FF7700" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="glow_r" cx="272" cy="168" r="30" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#FFB800" stopOpacity="0.7" />
          <Stop offset="0.5" stopColor="#FF7700" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#FF7700" stopOpacity="0" />
        </RadialGradient>

        {/* Center glow behind plane */}
        <RadialGradient id="center_glow" cx="170" cy="120" r="80" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#3A6CC0" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#0A0E1A" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Center ambient glow */}
      <Circle cx="170" cy="120" r="90" fill="url(#center_glow)" />

      {/* Large orbit ring (the horizon arc from the logo) */}
      <Ellipse cx="170" cy="80" rx="145" ry="110" stroke="#3A6CC0" strokeWidth="1" opacity="0.25" fill="none" />
      <Ellipse cx="170" cy="80" rx="130" ry="96" stroke="#5A8AD0" strokeWidth="0.5" opacity="0.15" fill="none" />

      {/* =================== LEFT WING =================== */}
      <Path
        d="M148 118 C120 120, 70 140, 28 158 C22 162, 22 170, 28 172 C55 162, 110 148, 148 148 Z"
        fill="url(#wing_grad_l)"
        opacity="0.95"
      />
      {/* Wing highlight edge */}
      <Path
        d="M148 118 C120 120, 70 140, 28 158"
        stroke="#C0CCE0"
        strokeWidth="0.8"
        opacity="0.5"
        fill="none"
      />

      {/* =================== RIGHT WING =================== */}
      <Path
        d="M192 118 C220 120, 270 140, 312 158 C318 162, 318 170, 312 172 C285 162, 230 148, 192 148 Z"
        fill="url(#wing_grad_r)"
        opacity="0.95"
      />
      <Path
        d="M192 118 C220 120, 270 140, 312 158"
        stroke="#C0CCE0"
        strokeWidth="0.8"
        opacity="0.5"
        fill="none"
      />

      {/* =================== LEFT BARBELL ENGINE =================== */}
      {/* Engine glow halo */}
      <Circle cx="68" cy="168" r="30" fill="url(#glow_l)" />

      {/* Barbell shaft */}
      <Rect x="40" y="165" width="56" height="6" rx="3" fill="#2A3550" stroke="#445070" strokeWidth="0.5" />

      {/* Left barbell plate outer */}
      <Circle cx="47" cy="168" r="17" fill="#1A2240" stroke="#2A3A60" strokeWidth="1.5" />
      <Circle cx="47" cy="168" r="13" fill="#141C34" stroke="#3A4E78" strokeWidth="1" />
      <Circle cx="47" cy="168" r="9" fill="#0D1428" stroke="#1E3060" strokeWidth="1" />
      <Circle cx="47" cy="168" r="4" fill="#FFB800" opacity="0.9" />

      {/* Gold ring glow around left engine */}
      <Circle cx="47" cy="168" r="17" fill="none" stroke="#FFB800" strokeWidth="2" opacity="0.7" />
      <Circle cx="47" cy="168" r="19" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.3" />
      <Circle cx="47" cy="168" r="21" fill="none" stroke="#FFB800" strokeWidth="0.5" opacity="0.15" />

      {/* Right barbell plate outer */}
      <Circle cx="89" cy="168" r="17" fill="#1A2240" stroke="#2A3A60" strokeWidth="1.5" />
      <Circle cx="89" cy="168" r="13" fill="#141C34" stroke="#3A4E78" strokeWidth="1" />
      <Circle cx="89" cy="168" r="9" fill="#0D1428" stroke="#1E3060" strokeWidth="1" />
      <Circle cx="89" cy="168" r="4" fill="#FFB800" opacity="0.9" />

      {/* Gold ring around right plate */}
      <Circle cx="89" cy="168" r="17" fill="none" stroke="#FFB800" strokeWidth="2" opacity="0.7" />
      <Circle cx="89" cy="168" r="19" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.3" />

      {/* =================== RIGHT BARBELL ENGINE =================== */}
      {/* Engine glow halo */}
      <Circle cx="272" cy="168" r="30" fill="url(#glow_r)" />

      {/* Barbell shaft */}
      <Rect x="244" y="165" width="56" height="6" rx="3" fill="#2A3550" stroke="#445070" strokeWidth="0.5" />

      {/* Left barbell plate */}
      <Circle cx="251" cy="168" r="17" fill="#1A2240" stroke="#2A3A60" strokeWidth="1.5" />
      <Circle cx="251" cy="168" r="13" fill="#141C34" stroke="#3A4E78" strokeWidth="1" />
      <Circle cx="251" cy="168" r="9" fill="#0D1428" stroke="#1E3060" strokeWidth="1" />
      <Circle cx="251" cy="168" r="4" fill="#FFB800" opacity="0.9" />

      {/* Gold ring */}
      <Circle cx="251" cy="168" r="17" fill="none" stroke="#FFB800" strokeWidth="2" opacity="0.7" />
      <Circle cx="251" cy="168" r="19" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.3" />
      <Circle cx="251" cy="168" r="21" fill="none" stroke="#FFB800" strokeWidth="0.5" opacity="0.15" />

      {/* Right barbell plate */}
      <Circle cx="293" cy="168" r="17" fill="#1A2240" stroke="#2A3A60" strokeWidth="1.5" />
      <Circle cx="293" cy="168" r="13" fill="#141C34" stroke="#3A4E78" strokeWidth="1" />
      <Circle cx="293" cy="168" r="9" fill="#0D1428" stroke="#1E3060" strokeWidth="1" />
      <Circle cx="293" cy="168" r="4" fill="#FFB800" opacity="0.9" />

      {/* Gold ring */}
      <Circle cx="293" cy="168" r="17" fill="none" stroke="#FFB800" strokeWidth="2" opacity="0.7" />
      <Circle cx="293" cy="168" r="19" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.3" />

      {/* =================== FUSELAGE =================== */}
      {/* Main body */}
      <Path
        d="M155 10 C142 10, 132 20, 132 36 L132 180 C132 196, 142 208, 155 210 L185 210 C198 210, 208 198, 208 182 L208 36 C208 20, 198 10, 185 10 Z"
        fill="url(#fuse_grad)"
      />

      {/* Fuselage highlight (left edge) */}
      <Path
        d="M140 20 C136 28, 135 40, 135 55 L135 150"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Cockpit windows - top */}
      <Ellipse cx="170" cy="52" rx="18" ry="22" fill="#1A2A4A" stroke="#3A5A8A" strokeWidth="1" opacity="0.95" />
      <Ellipse cx="170" cy="52" rx="14" ry="18" fill="#0D1A36" />
      {/* Cockpit glass highlight */}
      <Path
        d="M160 42 C162 40, 170 40, 175 44"
        stroke="rgba(100,180,255,0.6)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Fuselage panel lines */}
      <Line x1="135" y1="90" x2="205" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <Line x1="135" y1="130" x2="205" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <Line x1="135" y1="165" x2="205" y2="165" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

      {/* Side windows row */}
      <G opacity="0.6">
        <Rect x="140" y="96" width="12" height="8" rx="2" fill="#1A3060" stroke="#2A4A80" strokeWidth="0.5" />
        <Rect x="158" y="96" width="12" height="8" rx="2" fill="#1A3060" stroke="#2A4A80" strokeWidth="0.5" />
        <Rect x="176" y="96" width="12" height="8" rx="2" fill="#1A3060" stroke="#2A4A80" strokeWidth="0.5" />
        <Rect x="140" y="112" width="12" height="8" rx="2" fill="#1A3060" stroke="#2A4A80" strokeWidth="0.5" />
        <Rect x="158" y="112" width="12" height="8" rx="2" fill="#1A3060" stroke="#2A4A80" strokeWidth="0.5" />
        <Rect x="176" y="112" width="12" height="8" rx="2" fill="#1A3060" stroke="#2A4A80" strokeWidth="0.5" />
      </G>

      {/* Nose cone */}
      <Path
        d="M155 10 C160 2, 180 2, 185 10"
        stroke="#C0CCE0"
        strokeWidth="1"
        fill="none"
      />

      {/* Wing-fuselage connection fairing */}
      <Path
        d="M132 118 L148 118 L148 148 L132 148 Z"
        fill="#6878A0"
        opacity="0.5"
      />
      <Path
        d="M208 118 L192 118 L192 148 L208 148 Z"
        fill="#6878A0"
        opacity="0.5"
      />
    </Svg>
  );
}
