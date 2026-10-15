import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Pre-computed luxury easing curve for silky-smooth 60fps reveals.
 */
const DEFAULT_EASE = [0.22, 1, 0.36, 1];

/**
 * Fast lookup for direction-based transforms.
 */
const getOffset = (direction, distance) => {
  switch (direction) {
    case "up":
      return { y: distance, x: 0 };
    case "down":
      return { y: -distance, x: 0 };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
    case "fade":
    default:
      return { x: 0, y: 0 };
  }
};

/**
 * Reveal Component
 * High-performance, GPU-accelerated scroll reveal animation.
 *
 * @param {React.ReactNode} children - Elements to animate into view
 * @param {string} [direction="up"] - Reveal direction: "up" | "down" | "left" | "right" | "fade" | "zoom"
 * @param {number} [distance=26] - Travel distance in pixels
 * @param {number} [duration=0.55] - Animation duration in seconds
 * @param {number} [delay=0] - Delay before triggering animation in seconds
 * @param {Array<number>|string} [ease=DEFAULT_EASE] - Custom cubic-bezier easing
 * @param {number} [amount=0.15] - Viewport visibility threshold (0.0 to 1.0)
 * @param {string} [margin="0px 0px -40px 0px"] - Viewport margin offset
 * @param {boolean} [once=true] - Trigger animation only once (optimal for performance)
 * @param {string} [as="div"] - HTML element type (e.g. "div", "section", "article")
 * @param {string} [className=""] - Additional CSS classes
 * @param {object} [style={}] - Inline CSS styles
 */
function Reveal({
  children,
  direction = "up",
  distance = 26,
  duration = 0.55,
  delay = 0,
  ease = DEFAULT_EASE,
  amount = 0.15,
  margin = "0px 0px -40px 0px",
  once = true,
  as = "div",
  className = "",
  style = {},
  ...rest
}) {
  const reducedMotion = useReducedMotion();

  // Fast memoized variant definition
  const variants = useMemo(() => {
    if (reducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    if (direction === "zoom") {
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: { opacity: 1, scale: 1 },
      };
    }

    const { x, y } = getOffset(direction, distance);

    return {
      hidden: {
        opacity: 0,
        x,
        y,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
      },
    };
  }, [reducedMotion, direction, distance]);

  // Viewport configuration - once: true prevents redundant scroll listeners
  const viewportConfig = useMemo(
    () => ({
      once,
      amount,
      margin,
    }),
    [once, amount, margin]
  );

  // Transition configuration
  const transitionConfig = useMemo(
    () => ({
      duration: reducedMotion ? 0.25 : duration,
      delay,
      ease,
    }),
    [reducedMotion, duration, delay, ease]
  );

  // Select motion element dynamically (motion.div, motion.section, etc.)
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={variants}
      transition={transitionConfig}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

export default memo(Reveal);
export { Reveal };
