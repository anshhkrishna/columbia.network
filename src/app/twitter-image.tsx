import { ImageResponse } from 'next/og';

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
