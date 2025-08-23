import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Globe,
  Users,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  // Soothing floating animation variants
  const floatingVariants = {
    float: {
      y: [0, -6, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95], // Custom smooth easing
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease-out
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Consistent smooth easing
      },
    },
  };

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
        duration: Math.random() * 15 + 15, // Slower, more gentle movement
        repeat: Infinity,
        repeatType: "reverse",
        ease: [0.45, 0.05, 0.55, 0.95], // Smooth custom easing
      }}
    />
  ));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements}

        {/* Grid Pattern */}
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Login Form Section */}
              <motion.div
                className="w-full lg:w-1/2 p-8 md:p-12 relative"
                variants={itemVariants}
              >
                {/* Decorative Elements */}
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
                  variants={itemVariants}
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
                    variants={itemVariants}
                  >
                    Vibely
                  </motion.span>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <span className="text-red-200">
                        {error.response?.data?.message || "Login failed"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-8">
                  {/* Welcome Section */}
                  <motion.div className="space-y-3" variants={itemVariants}>
                    <h2 className="text-3xl font-bold text-white">
                      Welcome Back!
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Ready to continue your language adventure? Let's get you
                      signed in.
                    </p>
                  </motion.div>

                  {/* Form */}
                  <motion.form
                    onSubmit={handleLogin}
                    className="space-y-6"
                    variants={itemVariants}
                  >
                    {/* Email Field */}
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <label className="text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <div className="relative group">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-xl blur-sm"
                          animate={{
                            opacity: focusedField === "email" ? 0.8 : 0.2,
                            scale: focusedField === "email" ? 1.01 : 1,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-5 h-5 text-gray-400 z-10 transition-colors duration-300" />
                          <motion.input
                            type="email"
                            placeholder="hello@vibely.com"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 backdrop-blur-sm transition-all duration-500"
                            value={loginData.email}
                            onChange={(e) => {
                              setLoginData({
                                ...loginData,
                                email: e.target.value,
                              });
                              setIsTyping(true);
                              setTimeout(() => setIsTyping(false), 1000);
                            }}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            whileFocus={{ scale: 1.008 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 25,
                            }}
                            required
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <label className="text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <div className="relative group">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-secondary/15 to-primary/15 rounded-xl blur-sm"
                          animate={{
                            opacity: focusedField === "password" ? 0.8 : 0.2,
                            scale: focusedField === "password" ? 1.01 : 1,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                        <div className="relative flex items-center">
                          <Lock className="absolute left-4 w-5 h-5 text-gray-400 z-10 transition-colors duration-300" />
                          <motion.input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••"
                            className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 backdrop-blur-sm transition-all duration-500"
                            value={loginData.password}
                            onChange={(e) => {
                              setLoginData({
                                ...loginData,
                                password: e.target.value,
                              });
                              setIsTyping(true);
                              setTimeout(() => setIsTyping(false), 1000);
                            }}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            whileFocus={{ scale: 1.008 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 25,
                            }}
                            required
                          />
                          <motion.button
                            type="button"
                            className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-300 z-10"
                            onClick={() => setShowPassword(!showPassword)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Login Button */}
                    <motion.button
                      type="submit"
                      className="w-full relative group"
                      disabled={isPending}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      variants={itemVariants}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
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
                          <>
                            <MessageCircle className="w-5 h-5" />
                            <span>Enter Vibely</span>
                          </>
                        )}
                      </div>
                    </motion.button>

                    {/* Signup Link */}
                    <motion.div
                      className="text-center pt-4"
                      variants={itemVariants}
                    >
                      <p className="text-gray-300">
                        New to our community?{" "}
                        <Link
                          to="/signup"
                          className="text-primary hover:text-secondary font-semibold transition-colors duration-300 hover:underline"
                        >
                          Join the adventure
                        </Link>
                      </p>
                    </motion.div>
                  </motion.form>
                </div>
              </motion.div>

              {/* Illustration Section */}
              <motion.div
                className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden"
                variants={itemVariants}
              >
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
                  transition={{ delay: 4 }}
                >
                  <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <span className="text-2xl">🤝</span>
                  </div>
                </motion.div>

                {/* Main Illustration Area */}
                <div className="flex-1 flex items-center justify-center p-12 relative z-10">
                  <div className="max-w-md text-center space-y-8">
                    {/* Central Illustration */}
                    <motion.div
                      className="relative mx-auto w-80 h-80"
                      variants={floatingVariants}
                      animate="float"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                      <div className="relative bg-white/5 backdrop-blur-lg rounded-full border border-white/10 p-8 flex items-center justify-center">
                        <div className="text-center space-y-6">
                          <motion.div
                            className="flex justify-center space-x-4"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: [0.45, 0.05, 0.55, 0.95],
                            }}
                          >
                            <Users className="w-16 h-16 text-primary" />
                            <Globe className="w-16 h-16 text-secondary" />
                          </motion.div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">
                              Global Connections
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              Connect with speakers from 50+ countries
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Feature Cards */}
                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, y: -3 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <div className="text-3xl mb-2">🎯</div>
                        <h4 className="text-white font-semibold text-sm">
                          Smart Matching
                        </h4>
                        <p className="text-gray-300 text-xs">
                          AI-powered partner suggestions
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, y: -3 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <div className="text-3xl mb-2">⚡</div>
                        <h4 className="text-white font-semibold text-sm">
                          Real-time Chat
                        </h4>
                        <p className="text-gray-300 text-xs">
                          Instant conversations
                        </p>
                      </motion.div>
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

export default LoginPage;
