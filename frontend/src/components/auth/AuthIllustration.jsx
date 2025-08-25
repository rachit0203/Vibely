import { motion } from "framer-motion";

const floatingVariants = {
  float: {
    y: [0, -6, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
    },
  },
};

const AuthIllustration = () => {
  return (
    <div className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm"></div>

      {/* Floating Language Icons */}
      <motion.div
        className="absolute top-8 left-8"
        variants={floatingVariants}
        animate="float"
      >
        <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-2xl">🌍</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-24 right-16"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2 }}
      >
        <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-3xl">💬</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-24 left-12"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1 }}
      >
        <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-2xl">📚</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-12"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1.5 }}
      >
        <div className="w-20 h-20 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-4xl">🎯</span>
        </div>
      </motion.div>

      {/* Main Illustration */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
        <div className="relative w-full max-w-md">
          <motion.div
            className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl transform -rotate-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.div
            className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Connect & Learn
              </h3>
              <p className="text-gray-300 mb-6">
                Join a community of language enthusiasts and practice with native
                speakers from around the world.
              </p>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center"
                  >
                    <span className="text-lg">👋</span>
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="text-sm font-semibold">+99</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthIllustration;
