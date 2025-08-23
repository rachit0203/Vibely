import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, MessageCircle, Sparkles } from "lucide-react";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

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

  const backgroundElements = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-2xl"
      style={{
        width: Math.random() * 120 + 80,
        height: Math.random() * 120 + 80,
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Signup Form Section */}
              <motion.div
                className="w-full lg:w-1/2 p-8 md:p-12"
                variants={itemVariants}
              >
                {/* Decorative Sparkle */}
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

                {/* Logo */}
                <motion.div
                  className="mb-10 flex items-center gap-4"
                  variants={itemVariants}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-md opacity-60"></div>
                    <div className="relative bg-gradient-to-r from-primary to-secondary p-3 rounded-2xl">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-wider">
                    Vibely
                  </span>
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <span className="text-red-200">
                        {error.response?.data?.message || "Signup failed"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div className="space-y-8" variants={itemVariants}>
                  {/* Welcome */}
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white">
                      Join Vibely Today!
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Create your account and start connecting globally.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSignup} className="space-y-6">
                    {/* Full Name */}
                    <div className="relative">
                      <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 backdrop-blur-sm transition-all"
                        value={signupData.fullName}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="hello@vibely.com"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 backdrop-blur-sm transition-all"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 backdrop-blur-sm transition-all"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        At least 6 characters long
                      </p>
                    </div>

                    {/* Terms */}
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        required
                        className="accent-primary"
                      />
                      I agree to the{" "}
                      <span className="text-primary hover:underline">
                        terms
                      </span>{" "}
                      &{" "}
                      <span className="text-primary hover:underline">
                        privacy
                      </span>
                    </label>

                    {/* Signup Button */}
                    <motion.button
                      type="submit"
                      disabled={isPending}
                      className="w-full relative group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition"></div>
                      <div className="relative bg-gradient-to-r from-primary to-secondary py-4 px-6 rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-3">
                        {isPending ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <>
                            <MessageCircle className="w-5 h-5" />
                            <span>Create Account</span>
                          </>
                        )}
                      </div>
                    </motion.button>

                    {/* Login Link */}
                    <div className="text-center pt-2">
                      <p className="text-gray-300">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-primary hover:text-secondary font-semibold hover:underline"
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </form>
                </motion.div>
              </motion.div>

              {/* Illustration Section */}
              <motion.div
                className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden"
                variants={itemVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm"></div>
                <div className="flex-1 flex items-center justify-center p-12 relative z-10">
                  <div className="max-w-md text-center space-y-8">
                    <motion.div
                      className="relative mx-auto w-80 h-80"
                      variants={floatingVariants}
                      animate="float"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                      <div className="relative bg-white/5 backdrop-blur-lg rounded-full border border-white/10 p-8 flex items-center justify-center">
                        <div className="text-center space-y-6">
                          <h3 className="text-2xl font-bold text-white">
                            Join the Global Community
                          </h3>
                          <p className="text-gray-300 text-sm">
                            Find partners, practice languages, and grow
                            together.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
