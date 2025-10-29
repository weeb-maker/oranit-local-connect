import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Rocket } from "lucide-react";

const packages = [
  {
    name: "Starter",
    price: "Free",
    icon: Check,
    description: "Perfect for getting started",
    features: [
      "Basic business listing",
      "Contact information display",
      "Business category tag",
      "Opening hours",
      "Map location",
    ],
    color: "border-muted",
    buttonVariant: "outline" as const,
  },
  {
    name: "Base",
    price: "₪99/month",
    icon: Star,
    description: "Most popular choice",
    popular: true,
    features: [
      "Everything in Starter",
      "Photo gallery (up to 10 images)",
      "Customer reviews and ratings",
      "Social media links",
      "Special offers posting",
      "Priority in search results",
      "Monthly analytics report",
    ],
    color: "border-primary shadow-smooth-lg",
    buttonVariant: "default" as const,
  },
  {
    name: "Extended",
    price: "₪199/month",
    icon: Rocket,
    description: "Maximum visibility and features",
    features: [
      "Everything in Base",
      "Featured placement on homepage",
      "Unlimited photo gallery",
      "Video showcase",
      "Blog/news section",
      "Event posting",
      "Premium badge",
      "Detailed analytics dashboard",
      "Priority customer support",
      "Custom promotional campaigns",
    ],
    color: "border-accent shadow-smooth-lg",
    buttonVariant: "default" as const,
  },
];

const BusinessPackages = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
            <Rocket className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent-foreground">For Business Owners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Grow Your Business with Oranit.biz</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to showcase your business and reach more local customers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Card 
                key={index} 
                className={`relative transition-smooth hover:shadow-smooth-lg hover:-translate-y-2 border-2 ${pkg.color} ${pkg.popular ? 'lg:scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium shadow-smooth">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="text-4xl font-bold text-primary">{pkg.price}</div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={pkg.buttonVariant} 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <a href="/add-business">
                      {pkg.price === "Free" ? "Get Started Free" : "Choose Plan"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution for multiple locations or enterprise?
          </p>
          <Button variant="ghost" asChild>
            <a href="/contact">Contact Us for Custom Pricing</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BusinessPackages;
