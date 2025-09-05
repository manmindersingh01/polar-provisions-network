import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function BlizzardEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Clean up function will be called when component unmounts
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // Generate random snowflakes
  const snowflakes = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 3 + 1;
    const initialX = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    return (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full opacity-70"
        style={{
          width: size,
          height: size,
          left: `${initialX}%`,
          top: -10,
        }}
        animate={{
          y: ["0%", "100vh"],
          x: [0, Math.random() * 50 - 25],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );
  });

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {snowflakes}
    </div>
  );
}