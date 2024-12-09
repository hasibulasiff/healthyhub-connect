import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0f0a1e] to-[#1a1528] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">HealthyThako</h3>
            <p className="text-sm text-white/70">
              Discover and connect with the best fitness, wellness, and sports centers in your area.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/70 hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-purple-400 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-white/70 hover:text-purple-400 transition-colors">FAQs</Link></li>
              <li><Link to="/terms" className="text-white/70 hover:text-purple-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-white/70 hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/archive?category=gyms" className="text-white/70 hover:text-purple-400 transition-colors">Gyms</Link></li>
              <li><Link to="/archive?category=yoga" className="text-white/70 hover:text-purple-400 transition-colors">Yoga Studios</Link></li>
              <li><Link to="/archive?category=sports" className="text-white/70 hover:text-purple-400 transition-colors">Sports Centers</Link></li>
              <li><Link to="/archive?category=wellness" className="text-white/70 hover:text-purple-400 transition-colors">Wellness Centers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>1234 Fitness Street</li>
              <li>California, USA</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@healthythako.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-sm text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} HealthyThako. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;