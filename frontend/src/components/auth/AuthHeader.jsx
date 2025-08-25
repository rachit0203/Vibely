import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";

const AuthHeader = ({ error, variants }) => {
  return (
    <>
      {/* Decorative Element */}
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400/40" />
        </motion.div>
      </div>

      {/* Logo Section */}
      <motion.div
        className="mb-12 flex items-center justify-start gap-4"
        variants={variants}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-md opacity-60"></div>
          <div className="relative bg-gradient-to-r from-primary to-secondary p-3 rounded-2xl">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <motion.span
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-wider"
          variants={variants}
        >
          Vibely
        </motion.span>
      </motion.div>

      {/* Welcome Section */}
      <motion.div className="space-y-3 mb-8" variants={variants}>
        <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
        <p className="text-gray-300 text-lg">
          Ready to continue your language adventure? Let's get you signed in.
        </p>
      </motion.div>
    </>
  );
};

export default AuthHeader;
