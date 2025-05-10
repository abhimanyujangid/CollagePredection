import CompleteQuestion from "@/components/HowItwork/CompleteQuestion";
import CreateProfile from "@/components/HowItwork/CreateProfile";
import YourMatch from "@/components/HowItwork/YourMatch";
import { IFeatureCardProps } from "@/ZODtypes/landing";
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

  const dashboardLinks: INavLink[] = [
    { id: 2, name: "Recommendation", path: "ai" },
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

  const howItWorkData: IHowItWorkCardProps[] = [
    {
        id: 1,
        title: 'Create Profile',
        description: 'Sign up and tell us about your academic interests, location preferences, and budget. This helps our AI understand your needs better.',
        features: ['Choose between student or admin account', 'Fill in your academic details', 'Set your preferences and requirements'],
        component: <CreateProfile />
    },
    {
        id: 2,
        title: 'Complete the Questionnaire',
        description: 'Answer a series of interactive questions that help our AI understand your specific requirements and preferences for college selection.',
        features: ['Select your preferred field of study', 'Specify your budget and location preferences', 'Rank factors that matter most to you'],
        component: <CompleteQuestion />
    },
    {
        id: 3,
        title: 'Get Personalized Recommendations',
        description: 'Our AI analyzes thousands of colleges and finds the perfect matches for you based on your preferences, academic profile, and future aspirations.',
        features: ['Receive tailored college recommendations', 'View detailed college information', 'Compare and shortlist your top choices'],
        component: <YourMatch />
    }
]
  

export interface INavLink {
  id: number;
  name: string;
  path: string;
}

export interface IHowItWorkCardProps{
  id: number;
  title: string;
  description: string;
  features: string[];
  component: JSX.Element;
}


const stepData = 
  [
    {
      "id": "drawing",
      "title": "Drawing",
      "description": "Expressing creativity through visual art",
      "icon": "🎨",
      "color": "#ff8a65"
    },
    {
      "id": "dancing",
      "title": "Dancing",
      "description": "Expressing rhythm and movement",
      "icon": "💃",
      "color": "#ba68c8"
    },
    {
      "id": "singing",
      "title": "Singing",
      "description": "Vocal performance and musical expression",
      "icon": "🎤",
      "color": "#7986cb"
    },
    {
      "id": "sports",
      "title": "Sports",
      "description": "Engaging in physical games or competitions",
      "icon": "⚽",
      "color": "#4db6ac"
    },
    {
      "id": "video-game",
      "title": "Video Game",
      "description": "Playing electronic games for fun or competition",
      "icon": "🎮",
      "color": "#9575cd"
    },
    {
      "id": "acting",
      "title": "Acting",
      "description": "Performing in plays, movies, or TV shows",
      "icon": "🎭",
      "color": "#f06292"
    },
    {
      "id": "travelling",
      "title": "Travelling",
      "description": "Exploring new places and cultures",
      "icon": "✈️",
      "color": "#4fc3f7"
    },
    {
      "id": "gardening",
      "title": "Gardening",
      "description": "Cultivating plants and flowers",
      "icon": "🌱",
      "color": "#81c784"
    },
    {
      "id": "animals",
      "title": "Animals",
      "description": "Caring for or studying animals",
      "icon": "🐾",
      "color": "#a1887f"
    },
    {
      "id": "photography",
      "title": "Photography",
      "description": "Capturing moments through a lens",
      "icon": "📷",
      "color": "#90a4ae"
    },
    {
      "id": "teaching",
      "title": "Teaching",
      "description": "Educating and guiding others",
      "icon": "👨‍🏫",
      "color": "#ffb74d"
    },
    {
      "id": "exercise",
      "title": "Exercise",
      "description": "Maintaining fitness and health",
      "icon": "🏋️",
      "color": "#aed581"
    },
    {
      "id": "coding",
      "title": "Coding",
      "description": "Writing and building software",
      "icon": "💻",
      "color": "#64b5f6"
    },
    {
      "id": "electricity-components",
      "title": "Electricity Components",
      "description": "Working with electrical parts and circuits",
      "icon": "💡",
      "color": "#ffd54f"
    },
    {
      "id": "mechanic-parts",
      "title": "Mechanic Parts",
      "description": "Understanding and working with mechanical systems",
      "icon": "🔧",
      "color": "#b0bec5"
    },
    {
      "id": "computer-parts",
      "title": "Computer Parts",
      "description": "Understanding and assembling computer hardware",
      "icon": "🖥️",
      "color": "#81d4fa"
    },
    {
      "id": "researching",
      "title": "Researching",
      "description": "Investigating and discovering new information",
      "icon": "🔬",
      "color": "#4db6ac"
    },
    {
      "id": "architecture",
      "title": "Architecture",
      "description": "Designing and constructing buildings",
      "icon": "🏛️",
      "color": "#e57373"
    },
    {
      "id": "historic-collection",
      "title": "Historic Collection",
      "description": "Collecting and studying historical artifacts",
      "icon": "🏺",
      "color": "#bcaaa4"
    },
    {
      "id": "botany",
      "title": "Botany",
      "description": "The scientific study of plants",
      "icon": "🌿",
      "color": "#81c784"
    },
    {
      "id": "zoology",
      "title": "Zoology",
      "description": "The scientific study of animals",
      "icon": "🐒",
      "color": "#a1887f"
    },
    {
      "id": "physics",
      "title": "Physics",
      "description": "The study of matter and energy",
      "icon": "⚛️",
      "color": "#7986cb"
    },
    {
      "id": "accounting",
      "title": "Accounting",
      "description": "Managing financial records and reports",
      "icon": "📊",
      "color": "#4dd0e1"
    },
    {
      "id": "economics",
      "title": "Economics",
      "description": "Analyzing production, distribution, and consumption",
      "icon": "💹",
      "color": "#aed581"
    },
    {
      "id": "sociology",
      "title": "Sociology",
      "description": "Studying society and social behavior",
      "icon": "👥",
      "color": "#ce93d8"
    },
    {
      "id": "geography",
      "title": "Geography",
      "description": "Studying Earth's physical features and climate",
      "icon": "🌍",
      "color": "#64b5f6"
    },
    {
      "id": "psycology",
      "title": "Psycology",
      "description": "Understanding the human mind and behavior",
      "icon": "🧠",
      "color": "#4db6ac"
    },
    {
      "id": "history",
      "title": "History",
      "description": "Exploring past events and civilizations",
      "icon": "📜",
      "color": "#ff8a65"
    },
    {
      "id": "science",
      "title": "Science",
      "description": "Exploring the natural and physical world",
      "icon": "🔭",
      "color": "#7986cb"
    },
    {
      "id": "business-education",
      "title": "Business Education",
      "description": "Learning about commerce and management",
      "icon": "🏢",
      "color": "#f06292"
    },
    {
      "id": "chemistry",
      "title": "Chemistry",
      "description": "Studying substances and reactions",
      "icon": "⚗️",
      "color": "#ba68c8"
    },
    {
      "id": "mathematics",
      "title": "Mathematics",
      "description": "Working with numbers and equations",
      "icon": "➗",
      "color": "#4fc3f7"
    },
    {
      "id": "biology",
      "title": "Biology",
      "description": "Studying living organisms",
      "icon": "🧬",
      "color": "#81c784"
    },
    {
      "id": "makeup",
      "title": "Makeup",
      "description": "Applying cosmetics and beauty products",
      "icon": "💄",
      "color": "#f06292"
    },
    {
      "id": "designing",
      "title": "Designing",
      "description": "Creating visuals and layouts",
      "icon": "🖌️",
      "color": "#4db6ac"
    },
    {
      "id": "content-writing",
      "title": "Content Writing",
      "description": "Writing blogs, articles, and web content",
      "icon": "✍️",
      "color": "#ffd54f"
    },
    {
      "id": "crafting",
      "title": "Crafting",
      "description": "Making things with hands and tools",
      "icon": "🧶",
      "color": "#ba68c8"
    },
    {
      "id": "literature",
      "title": "Literature",
      "description": "Exploring written works and stories",
      "icon": "📚",
      "color": "#a1887f"
    },
    {
      "id": "reading",
      "title": "Reading",
      "description": "Enjoying and analyzing written content",
      "icon": "📖",
      "color": "#ce93d8"
    },
    {
      "id": "cartooning",
      "title": "Cartooning",
      "description": "Drawing or animating humorous illustrations",
      "icon": "🎬",
      "color": "#ffb74d"
    },
    {
      "id": "debating",
      "title": "Debating",
      "description": "Arguing viewpoints in structured discussions",
      "icon": "🗣️",
      "color": "#7986cb"
    },
    {
      "id": "astrology",
      "title": "Astrology",
      "description": "Studying celestial influence on life",
      "icon": "🔮",
      "color": "#9575cd"
    },
    {
      "id": "hindi",
      "title": "Hindi",
      "description": "Interest in the Hindi language",
      "icon": "🇮🇳",
      "color": "#ff8a65"
    },
    {
      "id": "french",
      "title": "French",
      "description": "Interest in the French language",
      "icon": "🇫🇷",
      "color": "#ba68c8"
    },
    {
      "id": "english",
      "title": "English",
      "description": "Interest in the English language",
      "icon": "🇬🇧",
      "color": "#7986cb"
    },
    {
      "id": "urdu",
      "title": "Urdu",
      "description": "Interest in the Urdu language",
      "icon": "🇵🇰",
      "color": "#4db6ac"
    },
    {
      "id": "other-language",
      "title": "Other Language",
      "description": "Learning or speaking another language",
      "icon": "🌐",
      "color": "#90a4ae"
    },
    {
      "id": "solving-puzzles",
      "title": "Solving Puzzles",
      "description": "Solving logical or physical puzzles",
      "icon": "🧩",
      "color": "#f06292"
    },
    {
      "id": "gymnastics",
      "title": "Gymnastics",
      "description": "Performing physical agility routines",
      "icon": "🤸",
      "color": "#4fc3f7"
    },
    {
      "id": "yoga",
      "title": "Yoga",
      "description": "Practicing physical, mental, and spiritual exercises",
      "icon": "🧘",
      "color": "#81c784"
    },
    {
      "id": "engineering",
      "title": "Engineering",
      "description": "Applying science to design and build systems",
      "icon": "⚙️",
      "color": "#ffb74d"
    },
    {
      "id": "doctor",
      "title": "Doctor",
      "description": "Medical interest in treating people",
      "icon": "🩺",
      "color": "#e57373"
    },
    {
      "id": "pharmacist",
      "title": "Pharmacist",
      "description": "Interest in pharmaceutical science",
      "icon": "💊",
      "color": "#4db6ac"
    },
    {
      "id": "cycling",
      "title": "Cycling",
      "description": "Riding bicycles for sport or leisure",
      "icon": "🚴",
      "color": "#7986cb"
    },
    {
      "id": "knitting",
      "title": "Knitting",
      "description": "Creating fabric with needles and yarn",
      "icon": "🧵",
      "color": "#ba68c8"
    },
    {
      "id": "director",
      "title": "Director",
      "description": "Overseeing creative projects like films or plays",
      "icon": "🎬",
      "color": "#bcaaa4"
    },
    {
      "id": "journalism",
      "title": "Journalism",
      "description": "Reporting news and writing articles",
      "icon": "📰",
      "color": "#90a4ae"
    },
    {
      "id": "business",
      "title": "Bussiness",
      "description": "Involvement in commercial, industrial, or professional activities",
      "icon": "📈",
      "color": "#64b5f6"
    },
    {
      "id": "listening-music",
      "title": "Listening Music",
      "description": "Enjoying music in various genres",
      "icon": "🎧",
      "color": "#4fc3f7"
    },
  ]





export { landingPageLinks, featureCards, howItWorkData, dashboardLinks, stepData };