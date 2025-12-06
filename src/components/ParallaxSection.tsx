import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import car from '../assets/road/ae86-asset-2.png'
import nightCar from '../assets/road/ae86-asset-2-night.png'



interface Props {
  image: string;
  speed?: number; // seconds for one full cycle
  copies?: number; // number of image duplicates
  zIndex?: number;
}

export default function SeamlessParallax({ image, speed = 1, copies = 6 , zIndex = 0}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children) as HTMLElement[];
    const itemWidth = items[0].getBoundingClientRect().width;

    gsap.to(items, {
      x: `-=${itemWidth}`,
      duration: speed,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x);
          // wrap each image individually
          return `${((val + itemWidth) % itemWidth) - itemWidth}px`;
        },
      },
    });
  }, [speed]);

  return (
    <section
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        // zIndex : `${zIndex}`
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          position: "absolute",
          bottom: "0",
          zIndex: `${zIndex}`
          // height: "100%",
          // width: `${copies * 100}vw`, // total width = number of images × viewport
        }}
      >
        {[...Array(copies)].map((_, i) => (
          <img
            key={i}
            src={image}
            alt="parallax"
            style={{
              width: "500px",
              height: "200px",
              // objectFit: "cover",
              display: "block",
              flexShrink: 0,
              margin: "-2px",
              zIndex: '1'
            }}
          />
        ))}
      </div>

        <img
          style={{
              position: "absolute",
              zIndex: `${zIndex + 1}`,
              bottom: "-10%",
              left: "40%",
              width: "400px"
            }}
          src = {nightCar}
          alt = "toyota"
        />
       

    </section>
  );
}
