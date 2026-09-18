"use client";

import DepthCarousel from "@/components/site/DepthCarousel";
import { stockImages } from "@/lib/stockImages";

const ethosCarouselItems = [
  {
    image: stockImages.escapeTall,
    alt: "Morning mist over the hills near Mapple View",
  },
  {
    image: stockImages.escapeSquare,
    alt: "A warm, quiet corner at Mapple View",
  },
  {
    image: stockImages.gallery.sunbeams,
    alt: "Morning light over the tea ridge",
  },
  {
    image: stockImages.gallery.facade,
    alt: "The estate from the driveway",
  },
  {
    image: stockImages.timeline[0],
    alt: "Quiet hillside views around the resort",
  },
];

export default function EthosDepthCarousel() {
  return (
    <div className="relative h-[340px] w-full sm:h-[440px] lg:h-[520px]">
      <DepthCarousel
        items={ethosCarouselItems}
        cardWidth={280}
        cardHeight={360}
        radius={4}
        tint="#1b1c1a"
        depth={200}
        spread={80}
        tilt={20}
        tiltDirection="right"
        perspective={1400}
        visibleCards={4}
        falloff={0.18}
        blur={5}
        autoplay
        autoplayDelay={3600}
        loop
        showControls
        showIndicators
      />
    </div>
  );
}
