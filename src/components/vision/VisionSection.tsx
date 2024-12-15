import { motion } from "framer-motion";
import { Check } from "lucide-react";

const VisionSection = () => {
  const values = ["Accessibility for all", "Cultural sensitivity", "Scientific approach", "Continuous innovation"];
  
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0118] to-[#1A1F2C] text-white">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z" stroke="#FF69B4" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="#FF69B4" strokeWidth="2"/>
              </svg>
              <h2 className="text-3xl font-bold text-[#FF69B4]">Our Vision</h2>
            </motion.div>
            <motion.p 
              className="text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              At Healthy Thako, we believe that everyone deserves access to quality fitness guidance and support. Our mission is to make health and fitness accessible, affordable, and simple for everyone.
            </motion.p>
            <motion.p 
              className="text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              We understand the unique challenges and preferences of our community, which is why we've created a platform that combines technology with cultural understanding to deliver the best possible fitness experience.
            </motion.p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <motion.div 
                className="bg-[#1A1F2C] p-6 rounded-lg hover:bg-[#252A3A] transition-colors duration-300 hover:scale-105 transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-[#FF69B4] text-4xl font-bold mb-2">10K+</h3>
                <p className="text-gray-400">Active Users</p>
              </motion.div>
              <motion.div 
                className="bg-[#1A1F2C] p-6 rounded-lg hover:bg-[#252A3A] transition-colors duration-300 hover:scale-105 transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-[#FF69B4] text-4xl font-bold mb-2">95%</h3>
                <p className="text-gray-400">Success Rate</p>
              </motion.div>
            </div>
          </motion.div>
          <div className="space-y-8">
            <motion.div 
              className="bg-[#1A1F2C] p-8 rounded-lg hover:bg-[#252A3A] transition-all duration-300 hover:scale-105 transform"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FF69B4" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="#FF69B4" strokeWidth="2"/>
                </svg>
                <h3 className="text-xl font-semibold">Our Commitment</h3>
              </div>
              <p className="text-gray-300">
                We're committed to providing personalized fitness solutions that respect and incorporate local cultural elements while maintaining international standards of health and wellness.
              </p>
            </motion.div>
            <motion.div 
              className="bg-[#1A1F2C] p-8 rounded-lg hover:bg-[#252A3A] transition-all duration-300 hover:scale-105 transform"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6">Our Values</h3>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Check className="text-[#FF69B4] w-5 h-5" />
                    <span className="text-gray-300">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;