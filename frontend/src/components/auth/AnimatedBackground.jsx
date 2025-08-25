import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const backgroundElements = Array.from({ length: 15 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-2xl"
      style={{
        width: Math.random() * 150 + 80,
        height: Math.random() * 150 + 80,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 60 - 30],
        y: [0, Math.random() * 60 - 30],
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: Math.random() * 15 + 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {backgroundElements}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
