import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0f0a1e] to-[#1a1528] text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="animate-fade-in"
          >
            <h3 className="text-white text-lg font-bold mb-4">HealthyThako</h3>
            <p className="text-sm text-white/70">
              Discover and connect with the best fitness, wellness, and sports centers in your area.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                href="https://www.facebook.com/healthythako/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/healthythako/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://x.com/healthythako"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://bd.linkedin.com/company/healthy-thakoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/about" className="text-white/70 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/contact" className="text-white/70 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/faq" className="text-white/70 hover:text-purple-400 transition-colors">
                  FAQs
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/terms" className="text-white/70 hover:text-purple-400 transition-colors">
                  Terms & Conditions
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/privacy" className="text-white/70 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/search?category=gyms" className="text-white/70 hover:text-purple-400 transition-colors">
                  Gyms
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/search?category=yoga" className="text-white/70 hover:text-purple-400 transition-colors">
                  Yoga Studios
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/search?category=sports" className="text-white/70 hover:text-purple-400 transition-colors">
                  Sports Centers
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/search?category=wellness" className="text-white/70 hover:text-purple-400 transition-colors">
                  Wellness Centers
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <a href="mailto:info@healthythako.com" className="hover:text-purple-400 transition-colors">
                  info@healthythako.com
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 text-purple-400" />
                <a href="tel:+8801886102806" className="hover:text-purple-400 transition-colors">
                  +880 1886-102806
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>Dhaka, Bangladesh</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-white/10 mt-12 pt-8 text-sm text-center text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} HealthyThako. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;