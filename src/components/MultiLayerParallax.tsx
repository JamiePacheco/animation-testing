import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface Layer {
  image: string;
  speed: number;  // seconds for one full loop
  zIndex?: number;
  marginFix?: number; // optional negative margin for gap fix
}

export interface MultiLayerParallaxProps {
  layers: Layer[];
}

export default function MultiLayerParallax({ layers }: MultiLayerParallaxProps) {
  const layerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    layers.forEach((layer, idx) => {
      const track = layerRefs.current[idx];
      if (!track) return;

      const items = Array.from(track.children) as HTMLElement[];
      const imageWidth = items[0].getBoundingClientRect().width;

      gsap.to(items, {
        x: `-=${imageWidth}`,
        duration: layer.speed,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const val = parseFloat(x);
            // wrap each image individually
            return `${((val + imageWidth) % imageWidth) - imageWidth}px`;
          },
        },
      });
    });
  }, [layers]);

  return (
    <section
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {layers.map((layer, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) layerRefs.current[idx] = el;
          }}
          style={{
            position: "absolute",
            top: `-10%`,
            left: 0,
            display: "flex",
            width: "max-content",
            height: "100%",
            zIndex: layer.zIndex ?? idx,
          }}
        >
          {[0, 1, 2].map((_, i) => (
            <img
              key={i}
              src={layer.image}
              alt={`layer-${idx}`}
              style={{
                width: "100vw",
                height: "100%",
                objectFit: "cover",
                flexShrink: 0,
                display: "block",
                marginLeft: i === 0 ? 0 : layer.marginFix ?? -2, // small overlap to hide gaps
              }}
            />
          ))}

        </div>
      ))}
    </section>
  );
}
