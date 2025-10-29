import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import LocalDeals from "@/components/LocalDeals";
import UpcomingEvents from "@/components/UpcomingEvents";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import BusinessPackages from "@/components/BusinessPackages";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <FeaturedCategories />
        <LocalDeals />
        <UpcomingEvents />
        <SocialProof />
        <HowItWorks />
        <BusinessPackages />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
