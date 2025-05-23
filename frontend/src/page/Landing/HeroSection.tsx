import CategoryGrid from "./CategoryGrid";
import FeatureSection from "./Feature.Section";
import HeroUpper from "./HeroUpper";
import HowItWork from "./HowItWork";

const HeroSection = () => {
  return (
    <section className=" w-full  relative z-10 flex flex-col items-center justify-center text-center py-12 ">
      <HeroUpper />
      <CategoryGrid />
      <FeatureSection />
      <HowItWork />
    </section>
  );
};

export default HeroSection;
