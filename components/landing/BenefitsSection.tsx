
import { Card, CardContent } from "@/components/ui/card";

const BenefitsSection = ({ handlePaymentProcessing }) => {
  const benefits = [
    {
      metric: "3.2x",
      title: "Longer Focus Sessions",
      description: "Average users maintain deep focus 3.2x longer than before using our system."
    },
    {
      metric: "87%",
      title: "Reduced Procrastination",
      description: "Users report 87% reduction in task avoidance and abandonment behaviors."
    },
    {
      metric: "5+ Hours",
      title: "Daily Flow Time",
      description: "Advanced users achieve 5+ hours of flow state daily with sustained interest."
    },
    {
      metric: "94%",
      title: "Goal Completion",
      description: "94% of users complete their most important goals within 90 days."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Measurable Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real results from users who've taken control of their attention and transformed their productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-red-50 border-2 hover:border-orange-200">
              <CardContent className="pt-6">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
                  {benefit.metric}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Join the Focus Revolution?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Stop living on autopilot. Start creating with intention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handlePaymentProcessing} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Get Early Access
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
