import { useEffect, useRef, useState } from "react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 3D Tilt Card Effect
 * Card tilts based on mouse position
 */
const Card3DTilt = ({ children, className = "" }: Card3DTiltProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out",
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform:
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.3s ease-out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={`transform-gpu ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card3DTilt;
