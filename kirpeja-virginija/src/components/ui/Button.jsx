// src/components/Button.jsx

import React from 'react';

export default function Button({
  as = 'button',
  children,
  className = '',
  ariaLabel,
  ...props
}) {
  const Component = as;

  return (
    <Component
      {...props}
      aria-label={
        ariaLabel || (typeof children === 'string' ? children : undefined)
      }
      className={`
        px-6 py-2 rounded-full font-medium transition-all duration-300
        bg-[#C1A173] text-white
        hover:bg-[#a88b5f]
        shadow-[0_3px_8px_rgba(0,0,0,0.15)]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.22)]
        focus:outline-none focus:ring-2 focus:ring-[#C1A173] focus:ring-offset-2
        active:scale-[0.97]
        cursor-pointer
        inline-flex items-center justify-center
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
