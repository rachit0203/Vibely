import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Eye,
  Lightbulb,
  Code,
  Users,
  Rocket,
  Globe,
  Languages,
  MessageSquare,
  Video,
  UserCheck,
  Heart,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const AboutPage = () => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleOnHover = {
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

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

  // Timeline data
  const timelineData = [
    {
      year: "2024",
      title: "The Vision",
      description:
        "Identified the need for a platform that connects language learners globally through real-time communication.",
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
    },
    {
      year: "Q1 2024",
      title: "Development Begins",
      description:
        "Started building with modern tech stack - React 19, Node.js, Stream SDK for seamless video and chat experience.",
      icon: <Code className="w-6 h-6 text-primary" />,
    },
    {
      year: "Q2 2024",
      title: "Beta Launch",
      description:
        "Released the first version with core features: video calling, real-time chat, and user authentication.",
      icon: <Rocket className="w-6 h-6 text-primary" />,
    },
    {
      year: "Present",
      title: "Growing Community",
      description:
        "Continuously improving based on user feedback and expanding our global community of language learners.",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
  ];

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global Community",
      description: "Connect with language learners from all around the world.",
    },
    {
      icon: <Languages className="w-8 h-8 text-primary" />,
      title: "Language Exchange",
      description:
        "Practice speaking with native speakers and help others learn your language.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Real-time Chat",
      description: "Communicate instantly with text messages and voice notes.",
    },
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: "Video Calls",
      description:
        "Have face-to-face conversations to practice speaking and listening.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "Find Partners",
      description: "Connect with people who are learning your target language.",
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Build Friendships",
      description: "Make lasting connections while learning together.",
    },
  ];

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    return (
      <motion.div
        ref={ref}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariant}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="relative min-h-screen flex items-center justify-center px-4">
            {/* Animated Background Elements */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <motion.div
                className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                  x: [0, -100, 0],
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            <div className="relative z-10 text-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    About
                  </span>
                  <motion.span
                    className="block text-slate-800"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    Vibely
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Connecting cultures, breaking barriers, and building bridges
                through the power of conversation.
              </motion.p>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discover Our Story
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Features Grid */}
          {/* <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="card-body items-center text-center">
                    <div className="p-4 rounded-full bg-primary/10 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                    <p className="text-base-content/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection> */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection>
                <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-16">
                  Our Purpose
                </h2>
              </AnimatedSection>

              <motion.div
                className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Mission Card */}
                <motion.div
                  variants={fadeInUp}
                  {...scaleOnHover}
                  className="group"
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/20 h-full">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl mr-4">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Our Mission
                      </h3>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      To democratize language learning by creating an inclusive
                      platform where learners can connect with native speakers
                      worldwide. We believe that authentic conversations are the
                      key to mastering any language, and technology should make
                      these connections effortless and meaningful.
                    </p>
                    <motion.div
                      className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  variants={fadeInUp}
                  {...scaleOnHover}
                  className="group"
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/20 h-full">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl mr-4">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Our Vision
                      </h3>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      A world where language barriers no longer exist, where
                      every person can confidently communicate across cultures.
                      We envision Vibely as the bridge that connects diverse
                      communities, fostering understanding, friendship, and
                      global collaboration through shared learning experiences.
                    </p>
                    <motion.div
                      className="mt-6 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Our Story */}
          <AnimatedSection>
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Story
              </h2>
              <div className="relative">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 w-1 h-full bg-primary/20 -translate-x-1/2"></div>

                  {/* Timeline items */}
                  <div className="space-y-12">
                    {timelineData.map((item, index) => (
                      <div
                        key={index}
                        className={`relative flex ${
                          index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                        } items-center`}
                      >
                        <div className="w-1/2 px-4">
                          <motion.div
                            className="p-6 bg-base-200 rounded-xl shadow-lg"
                            initial={{
                              opacity: 0,
                              x: index % 2 === 0 ? -50 : 50,
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="flex items-center mb-2">
                              <div className="p-2 rounded-full bg-primary/10 mr-3">
                                {item.icon}
                              </div>
                              <h3 className="text-xl font-semibold">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-sm text-base-content/70">
                              {item.description}
                            </p>
                            <div className="mt-3 text-sm font-medium text-primary">
                              {item.year}
                            </div>
                          </motion.div>
                        </div>

                        {/* Timeline dot */}
                        <div className="absolute left-1/2 w-6 h-6 bg-primary rounded-full -translate-x-1/2 flex items-center justify-center z-10">
                          <div className="w-3 h-3 bg-base-100 rounded-full"></div>
                        </div>

                        {/* Empty div for spacing on the other side */}
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection>
            <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to start your language journey?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of language learners who are improving their
                skills through real conversations.
              </p>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-base-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Vibely</h3>
              <p className="text-base-content/70">Connecting language learners through meaningful conversations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-base-content/70 hover:text-primary">Features</Link></li>
                <li><Link to="/pricing" className="text-base-content/70 hover:text-primary">Pricing</Link></li>
                <li><Link to="/download" className="text-base-content/70 hover:text-primary">Download</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-base-content/70 hover:text-primary">About Us</Link></li>
                <li><Link to="/careers" className="text-base-content/70 hover:text-primary">Careers</Link></li>
                <li><Link to="/blog" className="text-base-content/70 hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-base-content/70 hover:text-primary">Help Center</Link></li>
                <li><Link to="/contact" className="text-base-content/70 hover:text-primary">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-base-content/70 hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-base-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base-content/70">© 2024 Vibely. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:contact@vibely.com" className="text-base-content/70 hover:text-primary">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer> */}
      <section className="py-20 bg-gray-100 px-6 md:px-20 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.08 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-3xl shadow-2xl max-w-md text-center relative overflow-hidden"
        >
          {/* <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="w-36 h-36 mx-auto rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 mb-6 shadow-lg"
          ></motion.div> */}
          <img src="../public/profile.jpg" className="w-36 h-36 mx-auto rounded-full" alt="rachit pic" />
          <h3 className="text-3xl font-extrabold">Rachit Mishra</h3>
          <p className="text-gray-600 mt-2">Founder & Developer</p>
          <div className="flex justify-center gap-6 mt-6 text-indigo-600">
            <a href="https://github.com/rachit0203" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-800 transition">
              <FaGithub size={30} />
            </a>
            <a href="https://linkedin.com/in/mishra-rachit/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-800 transition">
              <FaLinkedin size={30} />
            </a>
            <a href="https://x.com/_rachit_mishra" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-800 transition">
              <FaTwitter size={30} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
