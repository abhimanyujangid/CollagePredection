import CategoryGrid from "./CategoryGrid";
import FeatureSection from "./Feature.Section";
import HeroUpper from "./HeroUpper";

const HeroSection = () => {
  return (
    <section className=" w-full  relative z-10 flex flex-col items-center justify-center text-center py-12 ">
      <HeroUpper />
      <CategoryGrid />
      <FeatureSection />
    </section>
  );
};

export default HeroSection;
