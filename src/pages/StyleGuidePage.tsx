import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Star, MapPin } from "lucide-react";

const StyleGuidePage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Oranit.biz Style Guide</h1>
        <p className="text-muted-foreground mb-12">Design system tokens and components</p>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-primary rounded-lg mb-2" />
              <p className="font-medium">Primary</p>
              <p className="text-sm text-muted-foreground">#2168F3</p>
            </div>
            <div>
              <div className="h-24 bg-secondary rounded-lg mb-2" />
              <p className="font-medium">Secondary</p>
              <p className="text-sm text-muted-foreground">#19B37A</p>
            </div>
            <div>
              <div className="h-24 bg-accent rounded-lg mb-2" />
              <p className="font-medium">Accent</p>
              <p className="text-sm text-muted-foreground">#FFB300</p>
            </div>
            <div>
              <div className="h-24 bg-destructive rounded-lg mb-2" />
              <p className="font-medium">Destructive</p>
              <p className="text-sm text-muted-foreground">#E3413F</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Heading 1 - 36px/44px</h1>
              <p className="text-sm text-muted-foreground">font-bold, line-height: 1.2</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold">Heading 2 - 28px/36px</h2>
              <p className="text-sm text-muted-foreground">font-semibold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Heading 3 - 22px/30px</h3>
              <p className="text-sm text-muted-foreground">font-semibold</p>
            </div>
            <div>
              <p className="text-base">Body text - 16px/24px - Regular weight</p>
            </div>
            <div>
              <p className="text-sm">Small text - 14px/20px</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Inputs</h2>
          <div className="max-w-md space-y-4">
            <Input placeholder="Default input" />
            <Input placeholder="Disabled input" disabled />
          </div>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-secondary text-secondary-foreground">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Cards</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description with muted text</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Card content goes here</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-primary/10" />
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Business Name
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">Category</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">Business description text</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">4.8</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Spacing Scale</h2>
          <div className="space-y-2">
            {[4, 8, 12, 16, 24, 32, 40, 56, 80].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <div
                  className="bg-primary"
                  style={{ width: `${size}px`, height: '24px' }}
                />
                <span className="text-sm">{size}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'XS', value: '6px' },
              { name: 'SM', value: '10px' },
              { name: 'MD', value: '16px' },
              { name: 'LG', value: '20px' },
              { name: 'XL', value: '28px' },
            ].map((radius) => (
              <div key={radius.name} className="text-center">
                <div
                  className="h-24 bg-primary mb-2"
                  style={{ borderRadius: radius.value }}
                />
                <p className="font-medium">{radius.name}</p>
                <p className="text-sm text-muted-foreground">{radius.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StyleGuidePage;
