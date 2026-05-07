
import { Card } from '../ui/Card';
import { Circle, Square, Triangle } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      title: "Absolute Geometry",
      description: "Every element is constructed from perfect circles, squares, or triangles. No organic shapes, no compromises.",
      icon: <Circle className="w-8 h-8 text-primary-red" />,
      decoration: "circle" as const,
      decorationColor: "red" as const
    },
    {
      title: "Hard Shadows",
      description: "We use solid offset shadows to create depth. Soft blurs are strictly forbidden in this constructivist realm.",
      icon: <Square className="w-8 h-8 text-primary-blue" />,
      decoration: "square" as const,
      decorationColor: "blue" as const
    },
    {
      title: "Primary Colors",
      description: "A stripped-back palette consisting only of pure Red, Blue, and Yellow, grounded by stark #121212 black.",
      icon: <Triangle className="w-8 h-8 text-primary-yellow" />,
      decoration: "triangle" as const,
      decorationColor: "yellow" as const
    }
  ];

  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 border-b-4 border-black relative overflow-hidden" id="features">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pattern-dots pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            The Rules
          </h2>
          <p className="text-xl font-medium border-l-4 border-primary-red pl-6">
            Our design system is built on strict constraints. These constraints breed true creativity and unbreakable consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              decoration={feature.decoration} 
              decorationColor={feature.decorationColor}
              className="group"
            >
              <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center mb-8 shadow-small group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">
                {feature.title}
              </h3>
              <p className="font-medium text-lg leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
