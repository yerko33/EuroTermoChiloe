import React from 'react';
import { FINISH_OPTIONS } from './constants';
import { LayoutDistributionId, WindowConfiguration, WindowType } from './types';

interface WindowSvgPreviewProps {
  config: WindowConfiguration;
  compact?: boolean;
}

interface PaneRect {
  x: number;
  y: number;
  w: number;
  h: number;
  isFixedTransom?: boolean;
  hingeSide?: 'left' | 'right';
  slideDirection?: 'left' | 'right';
}

function buildPanes(
  innerX: number,
  innerY: number,
  innerW: number,
  innerH: number,
  mullion: number,
  distribution: LayoutDistributionId,
  windowType: WindowType
): { panes: PaneRect[]; mullions: Array<{ x: number; y: number; w: number; h: number }> } {
  const panes: PaneRect[] = [];
  const mullions: Array<{ x: number; y: number; w: number; h: number }> = [];

  if (distribution === '1_hoja') {
    panes.push({
      x: innerX,
      y: innerY,
      w: innerW,
      h: innerH,
      hingeSide: 'left',
      slideDirection: 'right',
    });
  } else if (distribution === '2_hojas') {
    const colW = (innerW - mullion) / 2;
    mullions.push({ x: innerX + colW, y: innerY, w: mullion, h: innerH });
    panes.push({
      x: innerX,
      y: innerY,
      w: colW,
      h: innerH,
      hingeSide: 'left',
      slideDirection: 'right',
    });
    panes.push({
      x: innerX + colW + mullion,
      y: innerY,
      w: colW,
      h: innerH,
      hingeSide: 'right',
      slideDirection: 'left',
    });
  } else if (distribution === '3_hojas') {
    const colW = (innerW - mullion * 2) / 3;
    mullions.push({ x: innerX + colW, y: innerY, w: mullion, h: innerH });
    mullions.push({ x: innerX + colW * 2 + mullion, y: innerY, w: mullion, h: innerH });
    panes.push({
      x: innerX,
      y: innerY,
      w: colW,
      h: innerH,
      hingeSide: 'left',
      slideDirection: 'right',
    });
    panes.push({
      x: innerX + colW + mullion,
      y: innerY,
      w: colW,
      h: innerH,
      isFixedTransom: windowType === 'corredera',
      hingeSide: 'left',
      slideDirection: 'right',
    });
    panes.push({
      x: innerX + colW * 2 + mullion * 2,
      y: innerY,
      w: colW,
      h: innerH,
      hingeSide: 'right',
      slideDirection: 'left',
    });
  } else if (distribution === '2_hojas_montante') {
    const topH = Math.max(24, (innerH - mullion) * 0.28);
    const bottomH = innerH - mullion - topH;
    const colW = (innerW - mullion) / 2;

    // Transom horizontal bar
    mullions.push({ x: innerX, y: innerY + topH, w: innerW, h: mullion });
    // Lower vertical mullion
    mullions.push({ x: innerX + colW, y: innerY + topH + mullion, w: mullion, h: bottomH });

    panes.push({
      x: innerX,
      y: innerY,
      w: innerW,
      h: topH,
      isFixedTransom: true,
    });
    panes.push({
      x: innerX,
      y: innerY + topH + mullion,
      w: colW,
      h: bottomH,
      hingeSide: 'left',
      slideDirection: 'right',
    });
    panes.push({
      x: innerX + colW + mullion,
      y: innerY + topH + mullion,
      w: colW,
      h: bottomH,
      hingeSide: 'right',
      slideDirection: 'left',
    });
  } else if (distribution === 'cuadricula_2x2') {
    const colW = (innerW - mullion) / 2;
    const rowH = (innerH - mullion) / 2;
    mullions.push({ x: innerX + colW, y: innerY, w: mullion, h: innerH });
    mullions.push({ x: innerX, y: innerY + rowH, w: innerW, h: mullion });

    panes.push({
      x: innerX,
      y: innerY,
      w: colW,
      h: rowH,
      isFixedTransom: true,
    });
    panes.push({
      x: innerX + colW + mullion,
      y: innerY,
      w: colW,
      h: rowH,
      isFixedTransom: true,
    });
    panes.push({
      x: innerX,
      y: innerY + rowH + mullion,
      w: colW,
      h: rowH,
      hingeSide: 'left',
      slideDirection: 'right',
    });
    panes.push({
      x: innerX + colW + mullion,
      y: innerY + rowH + mullion,
      w: colW,
      h: rowH,
      hingeSide: 'right',
      slideDirection: 'left',
    });
  }

  return { panes, mullions };
}

export const WindowSvgPreview: React.FC<WindowSvgPreviewProps> = ({ config, compact = false }) => {
  const finish = FINISH_OPTIONS.find((item) => item.id === config.finish) ?? FINISH_OPTIONS[0];

  const viewWidth = compact ? 360 : 560;
  const viewHeight = compact ? 270 : 420;
  const maxDrawW = compact ? 250 : 350;
  const maxDrawH = compact ? 185 : 275;
  const centerX = compact ? 192 : 300;
  const centerY = compact ? 142 : 224;

  const scale = Math.min(maxDrawW / config.widthCm, maxDrawH / config.heightCm);
  const winW = Math.max(60, config.widthCm * scale);
  const winH = Math.max(52, config.heightCm * scale);
  const winX = centerX - winW / 2;
  const winY = centerY - winH / 2;

  const outerFrame = Math.max(8, Math.min(16, Math.min(winW, winH) * 0.085));
  const innerX = winX + outerFrame;
  const innerY = winY + outerFrame;
  const innerW = winW - outerFrame * 2;
  const innerH = winH - outerFrame * 2;
  const mullion = Math.max(5, outerFrame * 0.62);

  const { panes, mullions } = buildPanes(
    innerX,
    innerY,
    innerW,
    innerH,
    mullion,
    config.distribution,
    config.windowType
  );

  const uniqueId = React.useId().replace(/:/g, '');
  const glassGradId = `glass-grad-${uniqueId}`;
  const woodPatternId = `wood-pat-${uniqueId}`;

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      className="w-full h-auto select-none"
      role="img"
      aria-label={`Vista frontal esquemática de ventana ${config.windowType} de ${config.widthCm} cm por ${config.heightCm} cm en acabado ${finish.label}`}
    >
      <defs>
        <linearGradient id={glassGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8F5E9" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F5FAF6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#D7EED9" stopOpacity="0.9" />
        </linearGradient>

        <pattern
          id={woodPatternId}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(8)"
        >
          <rect width="16" height="16" fill={finish.frameHex} />
          <path
            d="M0 4 Q8 2 16 4 M0 11 Q8 13 16 11"
            stroke={finish.frameStrokeHex}
            strokeWidth="0.9"
            strokeOpacity="0.35"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Architectural sill shadow */}
      <rect
        x={winX - 6}
        y={winY + winH}
        width={winW + 12}
        height={6}
        rx={1}
        fill="#1E1B18"
        fillOpacity="0.1"
      />

      {/* Outer PVC Frame */}
      <rect
        x={winX}
        y={winY}
        width={winW}
        height={winH}
        fill={finish.isWoodTone ? `url(#${woodPatternId})` : finish.frameHex}
        stroke={finish.frameStrokeHex}
        strokeWidth={1.4}
      />

      {/* Inner Frame Cavity */}
      <rect
        x={innerX}
        y={innerY}
        width={innerW}
        height={innerH}
        fill="#FFFFFF"
        stroke={finish.frameStrokeHex}
        strokeWidth={1}
      />

      {/* Mitered 45-degree corner lines on outer frame */}
      <g stroke={finish.frameStrokeHex} strokeWidth={0.9} strokeOpacity="0.65">
        <line x1={winX} y1={winY} x2={innerX} y2={innerY} />
        <line x1={winX + winW} y1={winY} x2={innerX + innerW} y2={innerY} />
        <line x1={winX} y1={winY + winH} x2={innerX} y2={innerY + innerH} />
        <line x1={winX + winW} y1={winY + winH} x2={innerX + innerW} y2={innerY + innerH} />
      </g>

      {/* Panes */}
      {panes.map((pane, idx) => {
        const isMovable = config.windowType !== 'pano_fijo' && !pane.isFixedTransom;
        const sashThickness = isMovable ? Math.max(4.5, outerFrame * 0.55) : 0;
        const gx = pane.x + sashThickness;
        const gy = pane.y + sashThickness;
        const gw = Math.max(8, pane.w - sashThickness * 2);
        const gh = Math.max(8, pane.h - sashThickness * 2);

        const handleX =
          pane.hingeSide === 'left'
            ? pane.x + pane.w - sashThickness * 0.55
            : pane.x + sashThickness * 0.55;
        const handleY = pane.y + pane.h / 2;

        return (
          <g key={idx}>
            {/* Movable Sash Profile if applicable */}
            {isMovable && (
              <rect
                x={pane.x}
                y={pane.y}
                width={pane.w}
                height={pane.h}
                fill={finish.isWoodTone ? `url(#${woodPatternId})` : finish.frameHex}
                stroke={finish.frameStrokeHex}
                strokeWidth={1}
              />
            )}

            {/* Glass Surface */}
            <rect
              x={gx}
              y={gy}
              width={gw}
              height={gh}
              fill={`url(#${glassGradId})`}
              stroke={finish.frameStrokeHex}
              strokeWidth={0.85}
            />

            {/* Architectural specular reflection */}
            {gw > 20 && gh > 20 && (
              <g stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth={1.3} strokeLinecap="round">
                <line
                  x1={gx + gw * 0.18}
                  y1={gy + gh * 0.25}
                  x2={gx + gw * 0.34}
                  y2={gy + gh * 0.12}
                />
                <line
                  x1={gx + gw * 0.18}
                  y1={gy + gh * 0.35}
                  x2={gx + gw * 0.44}
                  y2={gy + gh * 0.13}
                />
              </g>
            )}

            {/* Opening Indicators */}
            {config.windowType === 'abatible' && isMovable && (
              <g stroke="#145A36" strokeWidth={1.2} strokeDasharray="4 3" fill="none">
                {pane.hingeSide === 'left' ? (
                  <polyline
                    points={`${gx},${gy} ${gx + gw},${gy + gh / 2} ${gx},${gy + gh}`}
                  />
                ) : (
                  <polyline
                    points={`${gx + gw},${gy} ${gx},${gy + gh / 2} ${gx + gw},${gy + gh}`}
                  />
                )}
              </g>
            )}

            {config.windowType === 'oscilobatiente' && isMovable && (
              <g fill="none">
                {/* Side turn indicator */}
                <g stroke="#145A36" strokeWidth={1.15} strokeDasharray="4 3">
                  {pane.hingeSide === 'left' ? (
                    <polyline
                      points={`${gx},${gy} ${gx + gw},${gy + gh / 2} ${gx},${gy + gh}`}
                    />
                  ) : (
                    <polyline
                      points={`${gx + gw},${gy} ${gx},${gy + gh / 2} ${gx + gw},${gy + gh}`}
                    />
                  )}
                </g>
                {/* Top tilt indicator */}
                <polyline
                  points={`${gx},${gy + gh} ${gx + gw / 2},${gy} ${gx + gw},${gy + gh}`}
                  stroke="#8C4325"
                  strokeWidth={1.15}
                  strokeDasharray="3 3"
                />
              </g>
            )}

            {config.windowType === 'corredera' && isMovable && (
              <g>
                {/* Sliding horizontal track hint at bottom */}
                <line
                  x1={gx + 4}
                  y1={gy + gh - 3}
                  x2={gx + gw - 4}
                  y2={gy + gh - 3}
                  stroke="#145A36"
                  strokeWidth={1}
                  strokeOpacity="0.4"
                />
                {/* Center sliding direction arrow */}
                {gw > 22 && (
                  <g stroke="#145A36" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    {pane.slideDirection === 'right' ? (
                      <>
                        <line
                          x1={gx + gw * 0.3}
                          y1={gy + gh * 0.5}
                          x2={gx + gw * 0.7}
                          y2={gy + gh * 0.5}
                        />
                        <polyline
                          points={`${gx + gw * 0.58},${gy + gh * 0.42} ${gx + gw * 0.7},${gy + gh * 0.5} ${gx + gw * 0.58},${gy + gh * 0.58}`}
                          fill="none"
                        />
                      </>
                    ) : (
                      <>
                        <line
                          x1={gx + gw * 0.7}
                          y1={gy + gh * 0.5}
                          x2={gx + gw * 0.3}
                          y2={gy + gh * 0.5}
                        />
                        <polyline
                          points={`${gx + gw * 0.42},${gy + gh * 0.42} ${gx + gw * 0.3},${gy + gh * 0.5} ${gx + gw * 0.42},${gy + gh * 0.58}`}
                          fill="none"
                        />
                      </>
                    )}
                  </g>
                )}
              </g>
            )}

            {(config.windowType === 'pano_fijo' || pane.isFixedTransom) && gw > 22 && gh > 22 && (
              <g stroke="#145A36" strokeOpacity="0.32" strokeWidth={1}>
                <line
                  x1={gx + gw / 2 - 5}
                  y1={gy + gh / 2}
                  x2={gx + gw / 2 + 5}
                  y2={gy + gh / 2}
                />
                <line
                  x1={gx + gw / 2}
                  y1={gy + gh / 2 - 5}
                  x2={gx + gw / 2}
                  y2={gy + gh / 2 + 5}
                />
              </g>
            )}

            {/* Sash Handle */}
            {isMovable && config.windowType !== 'corredera' && gh > 30 && (
              <g>
                <rect
                  x={handleX - 2}
                  y={handleY - 7}
                  width={4}
                  height={14}
                  rx={1.5}
                  fill="#1E1B18"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                />
              </g>
            )}
            {isMovable && config.windowType === 'corredera' && gh > 30 && (
              <rect
                x={
                  pane.slideDirection === 'right'
                    ? pane.x + sashThickness * 0.3
                    : pane.x + pane.w - sashThickness * 0.75
                }
                y={handleY - 8}
                width={3}
                height={16}
                rx={1}
                fill="#1E1B18"
                fillOpacity="0.8"
              />
            )}
          </g>
        );
      })}

      {/* Structural Mullions & Transoms */}
      {mullions.map((m, idx) => (
        <rect
          key={idx}
          x={m.x}
          y={m.y}
          width={m.w}
          height={m.h}
          fill={finish.isWoodTone ? `url(#${woodPatternId})` : finish.frameHex}
          stroke={finish.frameStrokeHex}
          strokeWidth={1}
        />
      ))}

      {/* Dimension Callouts (Top Width & Left Height) */}
      {!compact && (
        <g fill="#1E1B18" stroke="#1E1B18" fontSize="12" fontFamily="Inter, sans-serif">
          {/* Width Dimension */}
          <line
            x1={winX}
            y1={winY - 26}
            x2={winX + winW}
            y2={winY - 26}
            strokeOpacity="0.55"
            strokeWidth={1}
          />
          <line
            x1={winX}
            y1={winY - 32}
            x2={winX}
            y2={winY - 12}
            strokeOpacity="0.45"
            strokeWidth={1}
          />
          <line
            x1={winX + winW}
            y1={winY - 32}
            x2={winX + winW}
            y2={winY - 12}
            strokeOpacity="0.45"
            strokeWidth={1}
          />
          <rect
            x={centerX - 42}
            y={winY - 36}
            width={84}
            height={18}
            rx={3}
            fill="#FFFFFF"
            stroke="none"
          />
          <text
            x={centerX}
            y={winY - 23}
            textAnchor="middle"
            stroke="none"
            fontWeight="600"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {config.widthCm} cm
          </text>

          {/* Height Dimension */}
          <line
            x1={winX - 28}
            y1={winY}
            x2={winX - 28}
            y2={winY + winH}
            strokeOpacity="0.55"
            strokeWidth={1}
          />
          <line
            x1={winX - 34}
            y1={winY}
            x2={winX - 12}
            y2={winY}
            strokeOpacity="0.45"
            strokeWidth={1}
          />
          <line
            x1={winX - 34}
            y1={winY + winH}
            x2={winX - 12}
            y2={winY + winH}
            strokeOpacity="0.45"
            strokeWidth={1}
          />
          <rect
            x={winX - 58}
            y={centerY - 10}
            width={58}
            height={20}
            rx={3}
            fill="#FFFFFF"
            stroke="none"
          />
          <text
            x={winX - 30}
            y={centerY + 4}
            textAnchor="middle"
            stroke="none"
            fontWeight="600"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {config.heightCm} cm
          </text>
        </g>
      )}
    </svg>
  );
};
