import { motion } from "framer-motion";

const SubmitButton = ({ children, isPending, ...props }) => {
  return (
    <motion.button
      type="submit"
      className="w-full relative group"
      disabled={isPending}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
      <div className="relative bg-gradient-to-r from-primary to-secondary py-4 px-6 rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-3 transition-all duration-500">
        {isPending ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
          </motion.div>
        ) : (
          children
        )}
      </div>
    </motion.button>
  );
};

export default SubmitButton;
