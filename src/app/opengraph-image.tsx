import { ImageResponse } from 'next/og';
import { COLUMBIA_ASCII_LOGO } from '@/data/asciiLogo';

export const runtime = 'edge';

export const alt = 'cu.net';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: '#ffffff',
          fontFamily: 'Roboto, system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ASCII watermark (right side) */}
        <pre
          style={{
            position: 'absolute',
            right: -140,
            top: '50%',
            transform: 'translateY(-50%)',
            margin: 0,
            whiteSpace: 'pre',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: 10,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#6cb4e4',
            opacity: 0.22,
            textShadow: '0 0 22px rgba(108,180,228,0.22)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {COLUMBIA_ASCII_LOGO}
        </pre>

        {/* Brand mark (left side) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 88,
            paddingRight: 88,
            width: '100%',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 0.88,
              letterSpacing: -3,
            }}
          >
            <div style={{ fontSize: 148, fontWeight: 700, color: '#6cb4e4' }}>
              cu
            </div>
            <div style={{ fontSize: 132, fontWeight: 600, color: '#ffffff' }}>
              .net
            </div>
          </div>

          <div style={{ fontSize: 26, color: '#a3aab5', marginTop: 22 }}>
            a webring for columbia university students
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
