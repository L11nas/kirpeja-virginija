// src/components/Button.jsx

import React from 'react';

const VARIANTS = {
  // tamsus auksas su baltu tekstu – šviesiems fonams
  primary: 'bg-gold-dark text-white hover:bg-gold-darker focus:ring-offset-white',
  // šviesus auksas su tamsiu tekstu – tamsioms skiltims
  light: 'bg-gold text-ink-deep hover:bg-sand focus:ring-offset-ink-deep',
};

export default function Button({
  as = 'button',
  variant = 'primary',
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
        ariaLabel ||
        props['aria-label'] ||
        (typeof children === 'string' ? children : undefined)
      }
      className={`
        px-6 py-2 rounded-full font-medium transition-all duration-300
        ${VARIANTS[variant]}
        shadow-[0_3px_8px_rgba(0,0,0,0.15)]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.22)]
        focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
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
