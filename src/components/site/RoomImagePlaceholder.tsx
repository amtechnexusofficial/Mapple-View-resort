import { RoomViewScene } from "@/components/site/MountainArt";

const variants = ["dawn", "day", "dusk"] as const;

function pickVariant(seed: string): (typeof variants)[number] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return variants[hash % variants.length];
}

export default function RoomImagePlaceholder({
  name,
  className = "",
  nameClassName = "text-base sm:text-lg",
}: {
  name: string;
  className?: string;
  nameClassName?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden bg-charcoal ${className}`}
    >
      <RoomViewScene
        variant={pickVariant(name)}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
      <span className={`relative w-full px-6 pb-5 text-center font-display font-medium text-stone ${nameClassName}`}>
        {name}
      </span>
    </div>
  );
}
