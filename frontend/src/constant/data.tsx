import { IFeatureCardProps } from "@/types/landing";
import { Filter, School, Sun } from "lucide-react";

const landingPageLinks: INavLink[] = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Features", path: "/features" },
    { id: 3, name: "How It Works", path: "/how-it-works" },
    { id: 4, name: "Get Started", path: "/get-started" },
    { id: 5, name: "Colleges", path: "/colleges" },
    { id: 6, name: "FAQ", path: "/faq" },
    { id: 7, name: "Contact", path: "/contact" },
  ];

  const featureCards: IFeatureCardProps[] = [
    {
      logo: <Sun className="w-7 h-7 text-white" />, 
      title: "AI-Powered Recommendations",
      description: "Our intelligent algorithms analyze your profile, preferences, and academic history to provide tailored college recommendations.",
      features: [
        "Personalized suggestions",
        "Matches based on your goals",
        "Adaptive learning algorithms"
      ]
    },
    {
      logo: <School className="w-7 h-7 text-white" />, 
      title: "Top Colleges List",
      description: "Browse our curated list of top colleges across various streams, with comprehensive details to make informed decisions.",
      features: [
        "Sorted by rankings",
        "Available courses",
        "Placement rates"
      ]
    },
    {
      logo: <Filter className="w-7 h-7 text-white" />, 
      title: "Smart Filtering",
      description: "Easily filter and find colleges that match your specific criteria, from location to budget to academic interests.",
      features: [
        "Location-based filtering",
        "Tuition fee ranges",
        "Interest-based matching"
      ]
    }
  ];
  

export interface INavLink {
  id: number;
  name: string;
  path: string;
}







export { landingPageLinks, featureCards };