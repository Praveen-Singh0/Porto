"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollStackProps {
  children: React.ReactNode;
  index: number;
  total: number;
  range?: [number, number];
  targetScale?: number;
}

const ScrollStackCard: React.FC<ScrollStackProps> = ({
  children,
  index,
  total,
  range = [0, 1],
  targetScale = 0.95,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(
    scrollYProgress,
    range,
    [1, targetScale]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 1]
  );

  // Calculate sticky top position based on index
  const topOffset = 80 + index * 25;

  return (
    <div
      ref={container}
      className="sticky"
      style={{
        top: `${topOffset}px`,
        height: "fit-content",
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: "top center",
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ScrollStackContainerProps {
  children: React.ReactNode[];
  className?: string;
}

export const ScrollStackContainer: React.FC<ScrollStackContainerProps> = ({
  children,
  className = "",
}) => {
  const total = React.Children.count(children);

  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, (child, index) => (
        <ScrollStackCard
          key={index}
          index={index}
          total={total}
          range={[0, 1]}
          targetScale={0.9 - (total - index - 1) * 0.05}
        >
          {child}
        </ScrollStackCard>
      ))}
    </div>
  );
};

export default ScrollStackCard;
