
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      avatar: "SC",
      quote: "I went from 2-hour coding sessions to 6+ hours of uninterrupted deep work. The autopilot override system is a game-changer for complex problem-solving.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "Nike",
      avatar: "MR",
      quote: "Finally found a way to maintain creative flow for entire afternoons. My team's output has tripled, and the quality is consistently higher.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "MIT",
      avatar: "EW",
      quote: "The sustained engagement engine helped me complete my PhD dissertation in record time. I never lost interest or motivation, even during the hardest chapters.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from professionals who've transformed their focus and achieved extraordinary results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-2 hover:border-blue-200">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                
                <blockquote className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
