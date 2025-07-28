import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RoleSystem from "@/components/RoleSystem";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <RoleSystem />
      <Footer />
    </div>
  );
};

export default Index;
