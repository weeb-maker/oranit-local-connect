import { Link } from "react-router-dom";
import { Store, Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <Store className="h-6 w-6" />
              Oranit.biz
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting local businesses with the Oranit community. Support local, strengthen together.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth flex items-center justify-center"
              >
                <Facebook className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth flex items-center justify-center"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="mailto:hello@oranit.biz"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth flex items-center justify-center"
              >
                <Mail className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/directory" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Business Directory
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="font-semibold mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/add-business" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Add Your Business
                </Link>
              </li>
              <li>
                <Link to="/for-businesses" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/business-resources" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} Oranit.biz. All rights reserved.
          </p>
          <p className="text-sm font-medium text-primary">
            Supporting Local, Strengthening Oranit 🌱
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
