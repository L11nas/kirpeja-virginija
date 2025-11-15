export default function Button({ label, href, className = '' }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`
        inline-flex items-center justify-center
        px-6 py-2.5
        rounded-full
        bg-[#C1A173]
        text-white 
        text-sm font-medium
        shadow-[0_2px_6px_rgba(0,0,0,0.15)]
        hover:bg-[#AA8A63]
        hover:shadow-[0_4px_10px_rgba(0,0,0,0.18)]
        transition-all duration-200
        ${className}
      `}
    >
      {label}
    </a>
  );
}
