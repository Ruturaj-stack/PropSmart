import { Zap, TrendingUp, Flame } from "lucide-react";

type BadgeType = "new" | "hot" | "trending" | "verified";

interface PropertyBadgeProps {
  type: BadgeType;
}

/**
 * Property Badge Component
 * Visual indicators for property status
 */
const PropertyBadge = ({ type }: PropertyBadgeProps) => {
  const badges = {
    new: {
      label: "New",
      icon: <Zap className="h-3 w-3" />,
      className:
        "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    hot: {
      label: "Hot",
      icon: <Flame className="h-3 w-3" />,
      className:
        "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
    },
    trending: {
      label: "Trending",
      icon: <TrendingUp className="h-3 w-3" />,
      className:
        "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    },
    verified: {
      label: "Verified",
      icon: (
        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      className: "bg-accent/10 text-accent border-accent/20",
    },
  };

  const badge = badges[type];

  return (
    <div
      className={`
      inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold
      ${badge.className}
    `}
    >
      {badge.icon}
      <span>{badge.label}</span>
    </div>
  );
};

export default PropertyBadge;
