import React from 'react';

export const Bee = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="m4.93 19.07 1.41-1.41" />
    <path d="M12 22v-2" />
    <path d="m19.07 19.07-1.41-1.41" />
    <path d="M22 12h-2" />
    <path d="m19.07 4.93-1.41 1.41" />
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8l3-3" />
    <path d="M8 8L5 5" />
  </svg>
);

// Actually, let's make a better Buzz-like bee icon
export const BuzzBee = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2L9 5H15L12 2Z" /> {/* Antennae area */}
    <ellipse cx="12" cy="13" rx="6" ry="8" /> {/* Body */}
    <path d="M7 10C5 10 3 12 3 14C3 16 5 18 7 18" fill="none" stroke="currentColor" strokeWidth="2" /> {/* Left Wing */}
    <path d="M17 10C19 10 21 12 21 14C21 16 19 18 17 18" fill="none" stroke="currentColor" strokeWidth="2" /> {/* Right Wing */}
    <rect x="8" y="9" width="8" height="2" fill="black" /> {/* Stripes */}
    <rect x="7" y="12" width="10" height="2" fill="black" />
    <rect x="8" y="15" width="8" height="2" fill="black" />
    <circle cx="10" cy="8" r="1" fill="white" /> {/* Eyes */}
    <circle cx="14" cy="8" r="1" fill="white" />
  </svg>
);
