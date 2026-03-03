import { ImageResponse } from 'next/og';
import { COLUMBIA_ASCII_LOGO } from '@/data/asciiLogo';

export const runtime = 'edge';

export const alt = 'columbia.network';
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: 620,
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre',
                transform: 'translateX(260px)',
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 10,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#6cb4e4',
                opacity: 0.24,
                textShadow: '0 0 24px rgba(108,180,228,0.22)',
              }}
            >
              {COLUMBIA_ASCII_LOGO}
            </pre>
          </div>
        </div>

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
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2.2 }}>
            <span style={{ color: '#6cb4e4' }}>columbia</span>
            <span style={{ color: '#ffffff' }}>.network</span>
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
