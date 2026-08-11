/**
 * Custom Neon SVG Icons for Startpage Shortcuts
 * Gemini (Hexagon), Civitai Red (Decagon), Hugging Face (Rounded Triangle), FMHY (Diamond)
 */

const CUSTOM_ICONS = {
  gemini: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="64" height="64">
  <defs>
    <linearGradient id="gemini-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2e3a"/><stop offset="100%" stop-color="#181a22"/></linearGradient>
    <filter id="yellow-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="url(#gemini-bg)" stroke="#434857" stroke-width="3" rx="4"/>
  <g stroke="#ffe866" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#yellow-glow)">
    <circle cx="34" cy="28" r="3.5" fill="#181a22"/><circle cx="56" cy="24" r="3.5" fill="#181a22"/>
    <path d="M 34 31.5 L 34 46 L 44 58 L 62 70 M 34 46 L 24 55 M 56 27.5 L 56 42 L 72 54 M 56 42 L 44 58 M 34 36 L 56 31"/>
    <path d="M 72 26 L 72 32 M 69 29 L 75 29 M 38 68 L 38 76 M 34 72 L 42 72" stroke-width="1.5"/>
  </g>
</svg>`,

  civitai: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="64" height="64">
  <defs>
    <linearGradient id="civitai-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2e3a"/><stop offset="100%" stop-color="#181a22"/></linearGradient>
    <filter id="red-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <polygon points="50,7 75,14 93,32 93,68 75,86 50,93 25,86 7,68 7,32 25,14" fill="url(#civitai-bg)" stroke="#434857" stroke-width="3"/>
  <path d="M 50 20 C 30 20 20 35 20 53 C 20 70 35 80 50 80 C 58 80 63 75 63 70 C 63 66 60 63 60 59 C 60 54 65 50 71 50 L 73 50 C 80 50 85 43 85 35 C 85 24 70 20 50 20 Z" fill="none" stroke="#ff4d4d" stroke-width="2.5" filter="url(#red-glow)"/>
  <g filter="url(#red-glow)">
    <path d="M 33 32 A 6 6 0 0 1 42 27 L 39 37 Z" fill="#ff4d4d"/>
    <path d="M 48 25 A 6 6 0 0 1 58 26 L 52 35 Z" fill="#ffcc00"/>
    <path d="M 64 29 A 6 6 0 0 1 72 35 L 63 40 Z" fill="#20e070"/>
    <path d="M 28 45 A 6 6 0 0 1 30 55 L 36 48 Z" fill="#38bdf8"/>
  </g>
</svg>`,

  huggingface: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="64" height="64">
  <defs>
    <linearGradient id="hf-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2e3a"/><stop offset="100%" stop-color="#181a22"/></linearGradient>
    <filter id="yellow-glow-hf" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <path d="M 50 10 Q 56 10 88 68 Q 94 78 82 86 Q 74 90 50 90 Q 26 90 18 86 Q 6 78 12 68 Z" fill="url(#hf-bg)" stroke="#434857" stroke-width="3"/>
  <circle cx="50" cy="46" r="23" fill="none" stroke="#ffdd33" stroke-width="2.5" filter="url(#yellow-glow-hf)"/>
  <g stroke="#ffdd33" stroke-width="2.5" stroke-linecap="round" fill="none" filter="url(#yellow-glow-hf)">
    <path d="M 39 41 Q 43 36 47 41 M 53 41 Q 57 36 61 41 M 42 53 Q 50 60 58 53"/>
  </g>
  <g fill="none" stroke="#ffdd33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#yellow-glow-hf)">
    <path d="M 24 68 C 24 60 30 56 36 64 C 38 60 43 62 42 68 C 43 63 48 66 45 72 L 34 76 Z M 76 68 C 76 60 70 56 64 64 C 62 60 57 62 58 68 C 57 63 52 66 55 72 L 66 76 Z"/>
  </g>
</svg>`,

  fmhy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="64" height="64">
  <defs>
    <linearGradient id="fmhy-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2e3a"/><stop offset="100%" stop-color="#181a22"/></linearGradient>
    <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="15" y="15" width="70" height="70" rx="10" fill="url(#fmhy-bg)" stroke="#434857" stroke-width="3" transform="rotate(45 50 50)"/>
  <g stroke="#ff5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#orange-glow)">
    <path d="M 30 70 C 20 60 20 40 40 35 M 35 75 C 25 65 25 45 45 40 M 25 65 C 15 55 25 30 45 30"/>
    <path d="M 52 32 C 60 26 72 26 72 26 C 72 26 72 38 66 46 L 52 32 Z M 52 32 L 44 30 L 46 38 L 52 32 Z M 66 46 L 68 54 L 60 52 L 66 46 Z"/>
    <circle cx="63" cy="35" r="2.5" fill="#ff5533"/>
    <path d="M 72 50 L 72 56 M 69 53 L 75 53 M 58 18 L 58 22 M 56 20 L 60 20" stroke-width="1.5"/>
  </g>
</svg>`
};
