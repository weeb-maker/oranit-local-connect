import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Coffee, 
  Briefcase, 
  Wrench, 
  Heart, 
  Car, 
  Users, 
  Sparkles 
} from "lucide-react";

const categories = [
  {
    title: "Shops & Retail",
    icon: ShoppingBag,
    description: "Grocery, gifts, electronics",
    color: "from-green-500/20 to-green-600/20",
  },
  {
    title: "Food & Drink",
    icon: Coffee,
    description: "Restaurants, cafés, bars",
    color: "from-orange-500/20 to-orange-600/20",
  },
  {
    title: "Professional Services",
    icon: Briefcase,
    description: "Lawyers, accountants, IT",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "Home & Repairs",
    icon: Wrench,
    description: "Handymen, electricians, cleaners",
    color: "from-yellow-500/20 to-yellow-600/20",
  },
  {
    title: "Wellness & Care",
    icon: Heart,
    description: "Beauty, gyms, medical",
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    title: "Mobility & Transport",
    icon: Car,
    description: "Taxis, car repair",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    title: "Youth Services",
    icon: Users,
    description: "Babysitting, tutoring",
    color: "from-cyan-500/20 to-cyan-600/20",
  },
  {
    title: "Other Specialties",
    icon: Sparkles,
    description: "Artists, events, non-profits",
    color: "from-indigo-500/20 to-indigo-600/20",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need in our organized directory of local businesses and services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a
                key={category.title}
                href="/directory"
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="h-full transition-smooth hover:shadow-smooth-lg hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center transition-smooth group-hover:scale-110`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
