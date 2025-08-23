import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router"; 
import { GlobeIcon, LanguagesIcon, UsersIcon, UserPlus, UserCheck } from "lucide-react";

// Animation variants (no changes here)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const sectionVariant = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

// NEW: A component for the animated stats
function AnimatedCounter({ to, icon: Icon, text }) {
  const nodeRef = useRef();
  const [count, setCount] = useState(0);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return controls.stop;
    }
  }, [isInView, to]);

  return (
    <div className="flex flex-col items-center text-center p-4">
      <Icon className="w-10 h-10 mb-3 text-primary" />
      <span ref={nodeRef} className="text-4xl font-bold">
        {count.toLocaleString()}
      </span>
      <p className="text-gray-500 mt-1">{text}</p>
    </div>
  );
}

// NEW: A component for the interactive map pulses
function LocationPulse({ top, left, tooltipText }) {
  return (
    <div
      className="tooltip"
      data-tip={tooltipText}
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
      }}
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-primary/80"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

const HomePage = () => {

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section (No changes here) */}
      <motion.section
        className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20 md:py-24 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjEgM2M2LjA3MSAwIDExIDQuOTI5IDExIDExaDExdjExYzAgNi4wNzEtNC45MjkgMTEtMTEgMTFIMjF2LTExSDEwYy0uNTUyIDAtMS0uNDQ4LTEtMVYzYzAtLjU1Mi40NDgtMSAxLTFoMTF6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </motion.div>

        <div className="container mx-auto px-6 md:px-8 text-center relative z-10 max-w-5xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Connect with Language Partners
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Practice languages with native speakers and make new friends around
            the world.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 py-12 md:py-16 space-y-20 md:space-y-24 max-w-7xl">
        {/* ================================================================== */}
        {/* NEW: Global Connections Section                                  */}
        {/* ================================================================== */}
        <motion.section
          variants={sectionVariant}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="space-y-12"
        >
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Join a Thriving Global Community
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Vibely connects learners across continents. See our community in
              action.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Interactive Map */}
            <motion.div
              className="md:col-span-3 h-64 md:h-96 rounded-2xl bg-base-200/50 p-4 relative overflow-hidden border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-20"
                style={{
                  backgroundImage:
                    "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution._grey.svg')",
                }}
              ></div>
              {/* Add some interactive pulses */}
              <LocationPulse top={45} left={18} tooltipText="Brazil" />
              <LocationPulse top={35} left={80} tooltipText="Japan" />
              <LocationPulse top={28} left={52} tooltipText="Egypt" />
              <LocationPulse top={65} left={88} tooltipText="Australia" />
              <LocationPulse top={30} left={22} tooltipText="USA" />
              <LocationPulse top={25} left={45} tooltipText="Spain" />
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              className="md:col-span-2 grid grid-cols-2 sm:grid-cols-1 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={item}>
                <AnimatedCounter
                  to={150}
                  icon={GlobeIcon}
                  text="Countries Connected"
                />
              </motion.div>
              <motion.div variants={item}>
                <AnimatedCounter
                  to={75}
                  icon={LanguagesIcon}
                  text="Languages Spoken"
                />
              </motion.div>
              <motion.div variants={item}>
                <AnimatedCounter
                  to={25000}
                  icon={UsersIcon}
                  text="Active Learners"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="text-center py-16 bg-base-200 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with language partners, practice speaking, and make new friends from around the world.
            </p>
            <Link 
              to="/friends" 
              className="btn btn-primary btn-lg"
            >
              Find Language Partners Now
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;
