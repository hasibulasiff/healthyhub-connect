import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Fitness Coach",
    image: "/testimonials/fitness-coach.jpg",
    quote: "HealthyThako revolutionized how I connect with clients. The platform's cultural sensitivity and professional standards create the perfect balance."
  },
  {
    name: "Michael Rodriguez",
    role: "Gym Owner",
    image: "/testimonials/gym-owner.jpg",
    quote: "As a fitness center owner, HealthyThako helped us reach a diverse community while maintaining our unique identity and values."
  },
  {
    name: "Priya Patel",
    role: "Wellness Expert",
    image: "/testimonials/wellness-expert.jpg",
    quote: "The platform's commitment to cultural understanding while maintaining professional standards is exactly what the fitness industry needed."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            What Our Community Says
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied members who have transformed their fitness journey with HealthyThako
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;