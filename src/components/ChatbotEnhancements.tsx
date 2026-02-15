import { useState } from "react";

interface QuickReplyButtonsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

/**
 * Quick Reply Buttons for Chatbot
 * Clickable suggestion chips for faster interaction
 */
export const QuickReplyButtons = ({
  suggestions,
  onSelect,
}: QuickReplyButtonsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-foreground hover:bg-accent/10 hover:border-accent transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

/**
 * Typing Indicator for Chatbot
 * Animated dots showing AI is typing
 */
export const TypingIndicator = () => {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
        <svg
          className="h-4 w-4 text-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
      </div>
      <div className="bg-secondary rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <div
            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};
