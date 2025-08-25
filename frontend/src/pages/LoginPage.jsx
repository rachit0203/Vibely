import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLogin from "../hooks/useLogin";
import AuthHeader from "../components/auth/AuthHeader";
import AnimatedBackground from "../components/auth/AnimatedBackground";
import AuthIllustration from "../components/auth/AuthIllustration";
import LoginForm from "../components/auth/LoginForm";

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

  // Animation variants
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
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <AnimatedBackground />

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
                <AuthHeader error={error} variants={itemVariants} />

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
                  <LoginForm
                    loginData={loginData}
                    setLoginData={setLoginData}
                    isPending={isPending}
                    error={error}
                    handleLogin={handleLogin}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    setIsTyping={setIsTyping}
                  />
                </div>
              </motion.div>

              {/* Illustration Section */}
              <AuthIllustration />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
