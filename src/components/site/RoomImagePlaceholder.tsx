import { ContourLines } from "@/components/site/MountainArt";

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
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-charcoal ${className}`}
    >
      <ContourLines className="absolute inset-0 h-full w-full text-petrol-300" opacity={0.55} />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
      <span className={`relative px-6 text-center font-display font-medium text-stone/85 ${nameClassName}`}>
        {name}
      </span>
    </div>
  );
}
