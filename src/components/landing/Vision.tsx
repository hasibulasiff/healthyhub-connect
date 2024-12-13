import { CheckCircle } from "lucide-react";

const Vision = () => {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold mb-6 text-pink-500">Our Vision</h2>
          <p className="mb-6">
            At Healthy Thako, we believe that everyone deserves access to quality fitness guidance and support. 
            Our mission is to make health and fitness accessible, affordable, and simple for everyone.
          </p>
          <p className="mb-12">
            We understand the unique challenges and preferences of our community, which is why we've created 
            a platform that combines technology with cultural understanding to deliver the best possible fitness experience.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <h3 className="text-3xl font-bold text-pink-500 mb-2">10K+</h3>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <h3 className="text-3xl font-bold text-pink-500 mb-2">95%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
            <p className="text-gray-400">
              We're committed to providing personalized fitness solutions that respect and incorporate 
              local cultural elements while maintaining international standards of health and wellness.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-pink-500" />
                Accessibility for all
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-pink-500" />
                Cultural sensitivity
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-pink-500" />
                Scientific approach
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-pink-500" />
                Continuous innovation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;