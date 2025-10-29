import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Store } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary transition-smooth hover:opacity-80">
          <Store className="h-6 w-6" />
          Oranit.biz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Businesses & Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover">
                    {[
                      { title: "Shops & Retail", desc: "Grocery, gifts, electronics" },
                      { title: "Food & Drink", desc: "Restaurants, cafés, bars" },
                      { title: "Professional Services", desc: "Lawyers, accountants, IT" },
                      { title: "Home & Repairs", desc: "Handymen, electricians, cleaners" },
                      { title: "Wellness & Care", desc: "Beauty, gyms, medical" },
                      { title: "Mobility & Transport", desc: "Taxis, car repair" },
                      { title: "Youth Services", desc: "Babysitting, tutoring" },
                      { title: "Other Specialties", desc: "Artists, events, non-profits" },
                    ].map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href="/directory"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.desc}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/events">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    What's On
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/residents">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    For Residents
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/marketplace">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Marketplace
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/for-businesses">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    For Businesses
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/add-business">Add My Business</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-accent transition-smooth"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link to="/" className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              Home
            </Link>
            <Link to="/directory" className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              Businesses & Services
            </Link>
            <Link to="/events" className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              What's On
            </Link>
            <Link to="/residents" className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              For Residents
            </Link>
            <Link to="/marketplace" className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              Marketplace
            </Link>
            <Link to="/for-businesses" className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              For Businesses
            </Link>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="ghost" asChild className="w-full">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/add-business">Add My Business</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
