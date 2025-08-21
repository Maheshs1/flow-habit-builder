
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Brain, Target, Timer, TrendingUp, Eye } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Identity Shift Engine",
      description: "Shape habits by aligning actions with your sense of self and environment rather than willpower alone.",
      benefits: ["Environments designed to pull you into action", "Automatic “no-option” triggers that remove hesitation", "Action-first initiation patterns"]
    },
    {
      icon: Timer,
      title: "Zeigarnik Activation System",
      description: "Built-in loops that use unfinished tasks to keep your brain naturally drawn back to progress.",
      benefits: ["Incomplete-task momentum drivers", "Persistent subconscious engagement hooks", "Open-loop reactivation flows"]
    },
    {
      icon: Target,
      title: "5-Second Tool Rule Framework",
      description: "Frictionless design that ensures you’re always just seconds away from execution.",
      benefits: ["Instant-access tool placement intelligence", "Environment priming mechanisms", "Zero-setup action triggers"]
    },
    {
      icon: TrendingUp,
      title: "Reward-in-Action Visualization Layer",
      description: "A motivation engine that embeds rewards inside the activity itself.",
      benefits: ["Real-time reward simulation", "Dopamine-linked activity reinforcement", "Immersive visualization protocols"]
    },
    // {
    //   icon: Brain,
    //   title: "Autopilot Override System",
    //   description: "AI-powered prompts that break unconscious patterns and bring you back to intentional action.",
    //   benefits: ["Smart interruption detection", "Mindfulness micro-breaks", "Pattern recognition alerts"]
    // },
    // {
    //   icon: Target,
    //   title: "Flow State Activation",
    //   description: "Scientifically-designed protocols to enter and maintain peak performance states consistently.",
    //   benefits: ["Personalized flow triggers", "Optimal challenge matching", "Progress momentum tracking"]
    // },
    // {
    //   icon: Timer,
    //   title: "Sustained Engagement Engine",
    //   description: "Keep your interest alive for hours with dynamic content adaptation and motivation loops.",
    //   benefits: ["Interest decay prevention", "Dynamic difficulty adjustment", "Reward scheduling optimization"]
    // },
    // {
    //   icon: TrendingUp,
    //   title: "Performance Analytics",
    //   description: "Deep insights into your focus patterns, flow states, and productivity trends over time.",
    //   benefits: ["Focus quality metrics", "Flow state duration tracking", "Distraction pattern analysis"]
    // }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Focus Arsenal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge tools designed to transform your relationship with attention and unlock
            sustained high-performance states.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-2 hover:border-blue-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
