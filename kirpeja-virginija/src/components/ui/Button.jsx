export default function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`
        px-6 py-2 rounded-full font-medium transition-all duration-300
        bg-[#C1A173] text-white
        shadow-[0_3px_8px_rgba(0,0,0,0.15)]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.22)]
        active:scale-[0.97]

        /* Apple style gloss */
        relative overflow-hidden
        before:absolute before:inset-0 before:bg-white/10 before:opacity-0
        hover:before:opacity-10 before:transition-all

        focus:outline-none focus:ring-2 focus:ring-[#C1A173]/40
        ${className}
      `}
    >
      {children}
    </button>
  );
}
