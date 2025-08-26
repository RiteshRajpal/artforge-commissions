// Update this page (the content is just a fallback if you fail to update the page)

import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import CommissionShowcase from "@/components/CommissionShowcase";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CommissionShowcase />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
