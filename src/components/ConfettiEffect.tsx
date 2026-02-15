import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

/**
 * Confetti Animation Hook
 * Trigger celebration animations
 */
export const useConfetti = () => {
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return { triggerConfetti };
};

interface ConfettiButtonProps {
  onSave?: () => void;
  children: React.ReactNode;
}

/**
 * Button that triggers confetti on click
 */
export const ConfettiButton = ({ onSave, children }: ConfettiButtonProps) => {
  const { triggerConfetti } = useConfetti();

  const handleClick = () => {
    triggerConfetti();
    onSave?.();
  };

  return (
    <button onClick={handleClick} className="w-full">
      {children}
    </button>
  );
};
