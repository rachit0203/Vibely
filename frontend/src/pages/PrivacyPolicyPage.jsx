import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User, Server, Mail, ShieldCheck, Info } from 'lucide-react';

const PrivacyPolicyPage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const sections = [
    {
      icon: <Info className="w-6 h-6 text-primary" />,
      title: "Introduction",
      content: "At Vibely, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."
    },
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: "Information We Collect",
      content: "We collect information that you provide directly to us, including when you create an account, update your profile, or communicate with us. This may include your name, email address, profile information, and any other information you choose to provide. We also automatically collect certain information when you visit, use, or navigate our services."
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you related information, and provide customer support. We may also use your information to send you technical notices, updates, security alerts, and support messages."
    },
    {
      icon: <Server className="w-6 h-6 text-primary" />,
      title: "Data Storage and Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission or electronic storage is completely secure, so we cannot guarantee absolute security."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Your Privacy Rights",
      content: "You have the right to access, correct, or delete your personal information. You can update your account information at any time by accessing your account settings. You may also contact us to request access to, correct, or delete any personal information that you have provided to us."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Third-Party Services",
      content: "We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, or assist us in analyzing how our services are used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose."
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at privacy@vibely.com. We will respond to your inquiry within a reasonable timeframe."
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="space-y-8"
          variants={staggerContainer}
        >
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              className="bg-base-200 rounded-xl p-6 shadow-sm"
              variants={sectionVariants}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div 
            className="text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200"
            variants={sectionVariants}
          >
            <p>
              By using our services, you acknowledge that you have read and understood this Privacy Policy.
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;