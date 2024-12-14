const features = [
  {
    feature: "Listing Management",
    healthyThako: "✓",
    others: "Limited"
  },
  {
    feature: "Real-time Chat",
    healthyThako: "✓",
    others: "×"
  },
  {
    feature: "Review System",
    healthyThako: "✓",
    others: "Basic"
  },
  {
    feature: "Event Management",
    healthyThako: "✓",
    others: "×"
  },
  {
    feature: "Analytics Dashboard",
    healthyThako: "✓",
    others: "Limited"
  }
];

const FeaturesComparison = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose HealthyThako</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-6 py-3 text-left">Features</th>
                <th className="px-6 py-3 text-center">HealthyThako</th>
                <th className="px-6 py-3 text-center">Others</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4">{feature.feature}</td>
                  <td className="px-6 py-4 text-center text-green-500 font-bold">{feature.healthyThako}</td>
                  <td className="px-6 py-4 text-center text-gray-500">{feature.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComparison;