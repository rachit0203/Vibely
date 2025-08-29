import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, url: 'https://github.com/rachit0203', label: 'GitHub' },
    { icon: <FaLinkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/mishra-rachit/', label: 'LinkedIn' },
    { icon: <FaEnvelope className="w-5 h-5" />, url: 'mailto:your.email@example.com', label: 'Email' },
    { icon: <FaTwitter className="w-5 h-5" />, url: 'https://x.com/_rachit_mishra', label: 'Twitter' }
  ];

  const footerLinks = [
    { title: 'Quick Links', links: [
      { name: 'About Us', to: '/about' },
      { name: 'Features', to: '/features' },
      { name: 'Contact', to: '/contact' },
      { name: 'Privacy Policy', to: '/privacy' }
    ]},
    // { title: 'Resources', links: [
    //   { name: 'Documentation', to: '/docs' },
    //   { name: 'Blog', to: '/blog' },
    //   { name: 'Support', to: '/support' },
    //   { name: 'FAQ', to: '/faq' }
    // ]}
  ];

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/chat.png" alt="Vibely Logo" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Vibely
              </span>
            </div>
            <p className="text-sm text-base-content/70">
              Connecting people through shared experiences and meaningful conversations.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full bg-base-300 hover:bg-base-300/80 transition-colors duration-200"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-base-content">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.to}
                      className="text-sm text-base-content/70 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Newsletter</h3>
            <p className="text-sm text-base-content/70">
              Subscribe to get updates on new features and releases.
            </p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input input-bordered input-sm w-full max-w-xs bg-base-100"
              />
              <button className="btn btn-primary btn-sm">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-base-content/50 mt-2">
              We care about your data. Read our{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 mt-12 pt-8 text-center text-sm text-base-content/50">
          <p>
            &copy; {currentYear} Vibely. All rights reserved. Built with ❤️ by Rachit Mishra
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
