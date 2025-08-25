import { motion } from "framer-motion";

const FormInput = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  onFocus,
  onBlur,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      className={`w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 backdrop-blur-sm transition-all duration-500 ${className}`}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      required={required}
      whileFocus={{ scale: 1.008 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      {...props}
    />
  );
};

export default FormInput;
