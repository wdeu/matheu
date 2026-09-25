import React, { useMemo } from "react";

// Einmaliges, stummes Mini-Konfetti (nur CSS-Animation, kein Paket).
// Bei prefers-reduced-motion per CSS ausgeblendet.
const COLORS = ['#10b981', '#14b8a6', '#06b6d4', '#f59e0b', '#ffffff'];
const PIECES = 36;

const Confetti = () => {
  const pieces = useMemo(
    () => Array.from({ length: PIECES }, (_, i) => ({
      '--x': `${Math.random() * 100}%`,
      '--dx': `${Math.round((Math.random() - 0.5) * 160)}px`,
      '--rot': `${Math.round((Math.random() - 0.5) * 1080)}deg`,
      '--d': `${(1.8 + Math.random() * 1.2).toFixed(2)}s`,
      '--delay': `${(Math.random() * 0.5).toFixed(2)}s`,
      '--c': COLORS[i % COLORS.length],
    })),
    []
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((style, i) => <span key={i} style={style} />)}
    </div>
  );
};

export default Confetti;
