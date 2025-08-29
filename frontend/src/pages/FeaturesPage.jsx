import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Video, 
  MessageCircle, 
  Globe, 
  Users, 
  Shield, 
  Zap, 
  Smartphone,
  Settings,
  Search,
  BookOpen,
  Trophy,
  Clock,
  Headphones,
  Monitor,
  Wifi,
  Lock,
  UserCheck,
  Languages,
  Star,
  Play,
  Pause,
  Volume2,
  Camera,
  Mic,
  Share2,
  Heart,
  CheckCircle
} from 'lucide-react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05, transition: { duration: 0.3 } },
    whileTap: { scale: 0.95 }
  };

  // Main features data
  const mainFeatures = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "HD Video Calling",
      description: "Crystal-clear video calls with up to 50 participants using Stream Video SDK",
      details: "Experience high-definition video calling with adaptive bitrate streaming, noise cancellation, and automatic quality adjustment based on your connection.",
      benefits: ["HD 1080p video quality", "Up to 50 participants", "Screen sharing", "Virtual backgrounds"]
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Chat",
      description: "Instant messaging with typing indicators, read receipts, and emoji reactions",
      details: "Stay connected with lightning-fast messaging, file sharing, voice notes, and real-time translation to break language barriers.",
      benefits: ["Instant message delivery", "File & media sharing", "Voice messages", "Real-time translation"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Community",
      description: "Connect with native speakers and learners from 100+ countries worldwide",
      details: "Join a vibrant community of language enthusiasts, find conversation partners based on your interests, and practice with native speakers.",
      benefits: ["100+ countries", "Smart matching", "Interest-based groups", "Cultural exchange"]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learning Tools",
      description: "Built-in language learning features with progress tracking and achievements",
      details: "Access vocabulary builders, pronunciation guides, conversation starters, and track your learning progress with detailed analytics.",
      benefits: ["Progress tracking", "Vocabulary builder", "Pronunciation guide", "Achievement system"]
    }
  ];

  // Technical features
  const techFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "End-to-End Security", desc: "JWT authentication & encrypted connections" },
    { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Built with React 19 & optimized performance" },
    { icon: <Smartphone className="w-6 h-6" />, title: "Cross-Platform", desc: "Works seamlessly on all devices" },
    { icon: <Wifi className="w-6 h-6" />, title: "Offline Support", desc: "Access content even without internet" },
    { icon: <Settings className="w-6 h-6" />, title: "Customizable", desc: "Personalize your learning experience" },
    { icon: <UserCheck className="w-6 h-6" />, title: "Smart Matching", desc: "AI-powered partner recommendations" }
  ];

  // Feature categories
  const featureCategories = [
    {
      category: "Communication",
      icon: <MessageCircle className="w-6 h-6" />,
      features: [
        { name: "HD Video Calls", status: "available" },
        { name: "Group Chat", status: "available" },
        { name: "Voice Messages", status: "available" },
        { name: "Screen Sharing", status: "available" },
        { name: "File Sharing", status: "available" },
        { name: "Emoji Reactions", status: "available" }
      ]
    },
    {
      category: "Learning",
      icon: <BookOpen className="w-6 h-6" />,
      features: [
        { name: "Progress Tracking", status: "available" },
        { name: "Vocabulary Builder", status: "available" },
        { name: "Pronunciation Guide", status: "coming-soon" },
        { name: "Grammar Checker", status: "coming-soon" },
        { name: "Learning Games", status: "coming-soon" },
        { name: "Flashcards", status: "available" }
      ]
    },
    {
      category: "Community",
      icon: <Users className="w-6 h-6" />,
      features: [
        { name: "Partner Matching", status: "available" },
        { name: "Interest Groups", status: "available" },
        { name: "Cultural Exchange", status: "available" },
        { name: "Events Calendar", status: "coming-soon" },
        { name: "Leaderboards", status: "available" },
        { name: "Achievements", status: "available" }
      ]
    }
  ];

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Animation */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            animate={{ 
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Powerful Features
            </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12">
              Everything you need to master languages through authentic conversations and meaningful connections.
            </p>
          </motion.div>

          {/* Feature Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: "100+", label: "Countries" },
              { number: "50", label: "Max Participants" },
              { number: "24/7", label: "Available" },
              { number: "∞", label: "Learning Opportunities" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Features Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-16">
              Core Features
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Navigation */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`cursor-pointer p-6 rounded-2xl mb-4 transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-gradient-to-r from-primary via-accent to-secondary text-white shadow-xl' 
                      : 'bg-white/70 backdrop-blur-sm hover:bg-white/90 text-slate-800'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg mr-4 ${
                      activeFeature === index ? 'bg-white/20' : 'bg-blue-100'
                    }`}>
                      <div className={activeFeature === index ? 'text-white' : 'text-blue-600'}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className={`${activeFeature === index ? 'text-white/90' : 'text-slate-600'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Feature Detail Panel */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-primary via-accent to-secondary p-4 rounded-2xl mr-4 text-white">
                  {mainFeatures[activeFeature].icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {mainFeatures[activeFeature].title}
                </h3>
              </div>
              
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {mainFeatures[activeFeature].details}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {mainFeatures[activeFeature].benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-green-50 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Mock Video Player */}
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <motion.button
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-full text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  >
                    {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-white text-sm">
                    <Camera className="w-4 h-4" />
                    <Mic className="w-4 h-4" />
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <Users className="w-4 h-4" />
                    <span>12 participants</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features Grid */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-16">
              Technical Excellence
            </h2>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                {...scaleOnHover}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-full">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl w-fit mb-4 text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-16">
              Complete Feature Set
            </h2>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featureCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl mr-4 text-white">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{category.category}</h3>
                </div>

                <div className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <span className="text-slate-700 font-medium">{feature.name}</span>
                      {feature.status === 'available' ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-orange-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">Coming Soon</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Pattern */}
              <motion.div 
                className="absolute inset-0 opacity-10"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  backgroundSize: "30px 30px"
                }}
              />
              
              <div className="relative z-10">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Experience Vibely?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join thousands of learners who are already mastering languages with our powerful features.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Demo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Features;