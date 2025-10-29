import { Search, Heart, Gift } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Local Services",
    description: "Browse our comprehensive directory of verified Oranit businesses and services. Filter by category, read reviews, and compare options.",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Heart,
    title: "Save and Share Favorites",
    description: "Create your personal list of favorite businesses. Share recommendations with your neighbors and see what others love.",
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    icon: Gift,
    title: "Enjoy Community Benefits",
    description: "Access exclusive local discounts, special offers, and community events. Support local and get rewarded for it.",
    color: "from-green-500/20 to-green-600/20",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Oranit.biz Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to connect with your local community and support neighborhood businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center transition-smooth hover:scale-110`}>
                  <Icon className="h-12 w-12 text-primary" />
                </div>
                
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                </div>
                
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-secondary/50 rounded-xl p-8 max-w-2xl">
            <p className="text-lg font-medium mb-4">
              "Since using Oranit.biz, I've discovered so many great local businesses I never knew existed. It's made supporting our community so much easier!"
            </p>
            <p className="text-sm text-muted-foreground">— Local Resident</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
