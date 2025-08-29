import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  HeadphonesIcon,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  HelpCircle,
  Zap,
  Heart,
  Star,
  Coffee,
  Users
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    contactReason: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  // Contact methods
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@vibely.com",
      subtext: "We respond within 24 hours",
      color: "from-blue-500 to-blue-600",
      action: "mailto:hello@vibely.com"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7",
      subtext: "Average response time: 2 minutes",
      color: "from-green-500 to-green-600",
      action: "#"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      subtext: "Mon-Fri, 9AM-6PM EST",
      color: "from-purple-500 to-purple-600",
      action: "tel:+15551234567"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Support Center",
      description: "Find answers to common questions",
      contact: "Help Documentation",
      subtext: "100+ helpful articles",
      color: "from-orange-500 to-orange-600",
      action: "#"
    }
  ];

  // Contact reasons
  const contactReasons = [
    { value: 'general', label: 'General Inquiry', icon: <HelpCircle className="w-5 h-5" /> },
    { value: 'support', label: 'Technical Support', icon: <Zap className="w-5 h-5" /> },
    { value: 'partnership', label: 'Partnership', icon: <Users className="w-5 h-5" /> },
    { value: 'feedback', label: 'Feedback', icon: <Heart className="w-5 h-5" /> },
    { value: 'press', label: 'Press & Media', icon: <Star className="w-5 h-5" /> },
    { value: 'careers', label: 'Careers', icon: <Coffee className="w-5 h-5" /> }
  ];

  // Social media links
  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, name: 'GitHub', url: 'https://github.com/rachit0203/Vibely', color: 'hover:bg-gray-800' },
    { icon: <Twitter className="w-6 h-6" />, name: 'Twitter', url: '#', color: 'hover:bg-blue-500' },
    { icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', url: '#', color: 'hover:bg-blue-600' },
    { icon: <Instagram className="w-6 h-6" />, name: 'Instagram', url: '#', color: 'hover:bg-pink-500' },
    { icon: <Facebook className="w-6 h-6" />, name: 'Facebook', url: '#', color: 'hover:bg-blue-600' },
    { icon: <Youtube className="w-6 h-6" />, name: 'YouTube', url: '#', color: 'hover:bg-red-500' }
  ];

  // Office locations
  const offices = [
    {
      city: "Jhansi",
      address: "Biet Jhansi",
      timezone: "IST (UTC+5:30)",
      isHeadquarters: true
    },
    // {
    //   city: "New York",
    //   address: "456 Innovation Ave, NY, NY 10001",
    //   timezone: "EST (UTC-5)",
    //   isHeadquarters: false
    // },
    // {
    //   city: "London",
    //   address: "789 Digital Lane, London, UK EC1A 1BB",
    //   timezone: "GMT (UTC+0)",
    //   isHeadquarters: false
    // }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '', email: '', company: '', subject: '', message: '', contactReason: 'general'
      });
      setSubmitStatus(null);
    }, 3000);
  };

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
                Get in Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: <Clock className="w-6 h-6" />, stat: "< 24h", label: "Response Time" },
              { icon: <Globe className="w-6 h-6" />, stat: "24/7", label: "Support" },
              { icon: <Users className="w-6 h-6" />, stat: "100%", label: "Satisfaction" },
              { icon: <Heart className="w-6 h-6" />, stat: "∞", label: "Care" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <div className="text-blue-600 mb-2 flex justify-center">{item.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{item.stat}</div>
                <div className="text-slate-600 text-sm font-medium">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-16">
              Choose Your Preferred Way
            </h2>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                {...scaleOnHover}
                className="group cursor-pointer"
                onClick={() => method.action.startsWith('#') ? null : window.open(method.action, '_blank')}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-full">
                  <div className={`bg-gradient-to-br ${method.color} p-4 rounded-2xl w-fit mb-4 text-white group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{method.title}</h3>
                  <p className="text-slate-600 mb-3">{method.description}</p>
                  <div className="text-lg font-semibold text-slate-800 mb-1">{method.contact}</div>
                  <div className="text-sm text-slate-500">{method.subtext}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">Send us a Message</h3>
                
                {/* Contact Reason Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {contactReasons.map((reason) => (
                      <motion.button
                        key={reason.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, contactReason: reason.value }))}
                        className={`flex items-center p-3 rounded-xl border-2 transition-all ${
                          formData.contactReason === reason.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mr-2">{reason.icon}</span>
                        <span className="text-sm font-medium">{reason.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Company (Optional)
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
                        placeholder="Brief subject of your message"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                      isSubmitting
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary via-accent to-secondary  hover:shadow-lg hover:scale-[1.02]'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </motion.button>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
                    >
                      <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                      <span>Message sent successfully! We'll get back to you within 24 hours.</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Offices */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Office Locations */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <motion.div
                      key={index}
                      className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">{office.city}</h4>
                        {office.isHeadquarters && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            HQ
                          </span>
                        )}
                      </div>
                      <div className="text-slate-600 text-sm mb-1 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        {office.address}
                      </div>
                      <div className="text-slate-500 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        {office.timezone}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Follow Us</h3>
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center p-3 bg-slate-100 rounded-xl text-slate-600 transition-all ${social.color} hover:text-white`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              {/* <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  For urgent technical issues or account problems, our live chat is the fastest way to get help.
                </p>
                <motion.button
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Live Chat
                </motion.button>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Can't find what you're looking for? Check out our comprehensive help center.
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Help Center
            </motion.button>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Contact;