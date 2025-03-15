import CategoryGrid from "./CategoryGrid";
import HeroUpper from "./HeroUpper";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4  lg:px-8 relative z-10 flex flex-col items-center justify-center text-center py-12">
      <HeroUpper />
      <CategoryGrid />
    </section>
  );
};

export default HeroSection;
