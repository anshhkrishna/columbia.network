'use client';

import { COLUMBIA_ASCII_LOGO } from '@/data/asciiLogo';

export default function AsciiBackground() {
  return (
    <div className="ascii-art-background" aria-hidden="true">
      <pre>{COLUMBIA_ASCII_LOGO}</pre>
    </div>
  );
}

