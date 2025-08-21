
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const CTASection = () => {
  const features = [
    "7-day free trial with full access",
    "Personalized onboarding session",
    "24/7 support during trial",
    "Cancel anytime, no commitments"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Stop Living on
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Autopilot
          </span>
        </h2>

        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of professionals who've taken control of their attention and achieved
          unprecedented levels of focus and productivity.
        </p>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 mb-8">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-white">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-xl font-semibold transition-all duration-300 transform hover:scale-105">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900 px-12 py-4 text-xl transition-all duration-300">
            Book Demo Call
          </Button>
        </div>

        {/* <p className="text-blue-200 text-sm">
          No credit card required • Setup takes less than 2 minutes
        </p>
{/*  */}
        {/* <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-blue-100 text-lg font-medium mb-4">
            Trusted by teams at:
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <span className="text-white text-lg font-semibold">Google</span>
            <span className="text-white text-lg font-semibold">Microsoft</span>
            <span className="text-white text-lg font-semibold">Apple</span>
            <span className="text-white text-lg font-semibold">Netflix</span>
          </div>
        </div>  */}
      </div>
    </section>
  );
};

export default CTASection;
