import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Glassmorphism Card Component
 * Modern frosted glass effect with backdrop blur
 */
const GlassCard = ({
  children,
  className = "",
  hover = true,
}: GlassCardProps) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-lg
        shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
        ${hover ? "hover:bg-white/10 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] transition-all duration-300" : ""}
        ${className}
      `}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/5 opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
