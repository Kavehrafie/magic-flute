import { motion } from "framer-motion";
import { range, repeat } from "lodash-es";
import React, { type AllHTMLAttributes } from "react";
import { init } from "satori";

const LoadingDot = {
  display: "block",
  width: "0.4rem",
  height: "0.4rem",
  backgroundColor: "hsl(var(--foreground))",
  borderRadius: "25%",
};

const LoadingContainer = {
  width: "20rem",
  height: "1.2rem",
  display: "flex",
  justifyContent: "space-around",
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  repeatType: "reverse",
  repeat: Infinity,
  ease: "easeInOut",
};

export default function LoadingDots(props: AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        paddingTop: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.ul
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: 5 }).map((i, key) => (
          <motion.li
            key={key}
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
        ))}
      </motion.ul>
    </div>
  );
}
