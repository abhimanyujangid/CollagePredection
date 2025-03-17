import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface IFaqCardProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard = ({ title, description, isOpen, onClick }: IFaqCardProps) => {
  return (
    <Card className="p-4 flex flex-col items-center">
      <button
        className="flex justify-between items-center w-full  text-left"
        aria-expanded={isOpen}
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold pb-1">
          {title}
        </h3>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 text-blue-500 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </motion.svg>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden px-4  border-t border-gray-200 dark:border-gray-700 w-full"
      >
        <p className="text-gray-600 dark:text-gray-300 pt-1">{description}</p>
      </motion.div>
    </Card>
  );
};

const FAQ = () => {
  const faqData = [
    {
      title: "How does the AI recommendation system work?",
      description:
        "Our AI system analyzes your academic preferences, location requirements, budget constraints, and career aspirations to match you with colleges that best fit your profile. The recommendations are based on a comprehensive database of colleges, their admission criteria, placement statistics, and student reviews. The more information you provide during the questionnaire, the more accurate your recommendations will be.",
    },
    {
      title: "Is the service free to use?",
      description:
        "Yes, our college recommendation service is completely free for students. You can create an account, complete the questionnaire, and receive personalized recommendations without any charges. We aim to make the college selection process easier and more efficient for students across the globe.",
    },
    {
      title: "Can i change my preferences after receiving recommendations?",
      description:
        "Yes, you can update your preferences and requirements at any time to receive new recommendations. If you change your field of study, location preferences, or budget constraints, simply update your profile and complete the questionnaire again. Our AI system will generate fresh recommendations based on your latest inputs.",
    },
    {
        title: "How accurate are the college recommendations?",
        description:
            "Our AI system uses advanced algorithms to match your profile with colleges that closely align with your preferences and goals. While we strive for accuracy and relevance in our recommendations, we recommend researching the colleges further to make an informed decision. Factors such as faculty quality, campus facilities, extracurricular activities, and alumni network should also be considered when selecting a college.",
        },
        {
        title: "I'm a parent/guardian. Can I use the service on behalf of my child?",
        description:
            "Yes, parents or guardians can create an account on behalf of their child and provide the necessary information to receive college recommendations. However, we recommend involving the student in the process to ensure that their preferences and aspirations are accurately reflected in the recommendations. The student can also create their own account and complete the questionnaire independently.",
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/15">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our AI-powered college recommendation system.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqData.map((faq, index) => (
          <FaqCard
            key={index}
            title={faq.title}
            description={faq.description}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
        <Card className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're here to help. Reach out to our support team and get answers to your specific queries.
          </p>
          <Link
            to="#contact"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Contact Support
          </Link>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;