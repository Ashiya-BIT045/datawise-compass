import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import UseCasePreview from "@/components/home/UseCasePreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustBadges from "@/components/home/TrustBadges";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <main>
    <HeroSection />
    <CategoryGrid />
    <FeaturedProducts />
    <UseCasePreview />
    <TrustBadges />
    <CTASection />
  </main>
);

export default Index;
