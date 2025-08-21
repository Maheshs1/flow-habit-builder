
import { Card, CardContent } from "@/components/ui/card";

const ProblemSection = () => {
  const problems = [
    {
      emoji: "🧠",
      title: "Autopilot Thinking",
      description: "You catch yourself going through the motions without conscious awareness or intention."
    },
    {
      emoji: "📱",
      title: "Constant Distractions",
      description: "Every notification pulls you away from deep work, fragmenting your attention span."
    },
    {
      emoji: "⏰",
      title: "Time Disappears",
      description: "Hours pass by in a blur of half-finished tasks and shallow work sessions."
    },
    {
      emoji: "🎯",
      title: "Lost Focus",
      description: "You start with good intentions but quickly lose interest and abandon important activities."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Modern Focus Crisis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            In our hyperconnected world, we've lost the ability to maintain deep, sustained attention. 
            Sound familiar?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{problem.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-red-50 border-l-4 border-red-400 p-8 max-w-4xl mx-auto rounded-r-lg">
            <p className="text-lg text-red-800 font-medium">
              <strong>The Cost:</strong> The average knowledge worker checks email every 6 minutes and 
              loses 23 minutes refocusing after each interruption. That's 2.5 hours of lost productivity daily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
