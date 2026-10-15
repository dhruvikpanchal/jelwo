import { memo, useMemo, Children, isValidElement } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Standard luxury easing curve.
 */
const DEFAULT_EASE = [0.22, 1, 0.36, 1];

/**
 * Helper to calculate transform offsets for stagger items.
 */
const getItemOffset = (direction, distance) => {
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
 * StaggerItem Component
 * Represents an individual animated unit inside a <Stagger> container.
 *
 * @param {React.ReactNode} children - Item content
 * @param {string} [direction="up"] - "up" | "down" | "left" | "right" | "fade" | "zoom"
 * @param {number} [distance=22] - Pixel displacement before reveal
 * @param {number} [duration=0.5] - Item animation duration in seconds
 * @param {Array<number>|string} [ease=DEFAULT_EASE] - Transition easing curve
 * @param {string} [as="div"] - HTML tag (e.g. "div", "li", "span")
 * @param {string} [className=""] - CSS classes
 * @param {object} [style={}] - Inline styles
 */
export const StaggerItem = memo(function StaggerItem({
  children,
  direction = "up",
  distance = 22,
  duration = 0.5,
  ease = DEFAULT_EASE,
  as = "div",
  className = "",
  style = {},
  ...rest
}) {
  const reducedMotion = useReducedMotion();

  const itemVariants = useMemo(() => {
    if (reducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
      };
    }

    if (direction === "zoom") {
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration, ease },
        },
      };
    }

    const { x, y } = getItemOffset(direction, distance);

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
        transition: {
          duration,
          ease,
        },
      },
    };
  }, [reducedMotion, direction, distance, duration, ease]);

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      variants={itemVariants}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
});

/**
 * Stagger Component
 * High-performance orchestrator for cascading / staggered item reveals.
 *
 * @param {React.ReactNode} children - Child elements or <StaggerItem> components
 * @param {number} [staggerDelay=0.08] - Delay interval between each child's entrance (seconds)
 * @param {number} [delayChildren=0] - Delay before triggering the very first child (seconds)
 * @param {number} [amount=0.1] - Viewport trigger threshold (0.0 to 1.0)
 * @param {string} [margin="0px 0px -30px 0px"] - Viewport margin offset
 * @param {boolean} [once=true] - Trigger animation only once
 * @param {boolean} [autoWrap=false] - Automatically wrap top-level children in <StaggerItem>
 * @param {string} [as="div"] - HTML tag (e.g. "div", "ul", "ol", "section")
 * @param {string} [className=""] - CSS classes
 * @param {object} [style={}] - Inline styles
 */
export function Stagger({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  amount = 0.1,
  margin = "0px 0px -30px 0px",
  once = true,
  autoWrap = false,
  as = "div",
  className = "",
  style = {},
  ...rest
}) {
  const reducedMotion = useReducedMotion();

  // Container variants that control child propagation
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reducedMotion ? 0.02 : staggerDelay,
          delayChildren,
        },
      },
    }),
    [reducedMotion, staggerDelay, delayChildren]
  );

  const viewportConfig = useMemo(
    () => ({
      once,
      amount,
      margin,
    }),
    [once, amount, margin]
  );

  const MotionComponent = motion[as] || motion.div;

  // Render wrapped children if autoWrap is true
  const renderedChildren = useMemo(() => {
    if (!autoWrap) return children;

    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      // If already a StaggerItem, avoid double wrapping
      if (child.type === StaggerItem) return child;
      return <StaggerItem>{child}</StaggerItem>;
    });
  }, [children, autoWrap]);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={containerVariants}
      className={className}
      style={style}
      {...rest}
    >
      {renderedChildren}
    </MotionComponent>
  );
}

// Attach StaggerItem to Stagger for convenient <Stagger.Item> JSX syntax
Stagger.Item = StaggerItem;

export default memo(Stagger);
