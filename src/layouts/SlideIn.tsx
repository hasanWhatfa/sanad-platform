import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  once?: boolean; // لتشغيل الأنميشن مرة وحدة فقط
}

const SlideIn = ({
  children,
  direction = "bottom",
  duration = 0.6,
  delay = 0,
  once = true,
}: SlideInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case "left":
      initialX = -80;
      break;
    case "right":
      initialX = 80;
      break;
    case "top":
      initialY = -80;
      break;
    case "bottom":
      initialY = 80;
      break;
  }

  return (
    <motion.div
      className="motion_div_override"
      ref={ref}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease:"easeIn" }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
