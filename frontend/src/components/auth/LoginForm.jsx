import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, MessageCircle } from "lucide-react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

const LoginForm = ({
  loginData,
  setLoginData,
  isPending,
  error,
  handleLogin,
  focusedField,
  setFocusedField,
  showPassword,
  setShowPassword,
  setIsTyping,
}) => {
  return (
    <motion.form onSubmit={handleLogin} className="space-y-6">
      {/* Email Field */}
      <motion.div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email Address</label>
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
            <FormInput
              type="email"
              placeholder="hello@vibely.com"
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
              required
            />
          </div>
        </div>
      </motion.div>

      {/* Password Field */}
      <motion.div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Password</label>
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
            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
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
      <SubmitButton isPending={isPending}>
        {isPending ? null : (
          <>
            <MessageCircle className="w-5 h-5" />
            <span>Enter Vibely</span>
          </>
        )}
      </SubmitButton>

      {/* Signup Link */}
      <motion.div className="text-center pt-4">
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
  );
};

export default LoginForm;
