import { motion } from "framer-motion";
import { GraduationCap, FlaskConical, Megaphone, BarChart, ScrollText, Lightbulb, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { title: "Engineering", count: "250+ Colleges", icon: <GraduationCap size={32} />, color: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-500" },
  { title: "Medical", count: "120+ Colleges", icon: <FlaskConical size={32} />, color: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-500" },
  { title: "Arts", count: "180+ Colleges", icon: <Megaphone size={32} />, color: "bg-purple-100 dark:bg-purple-900/30", textColor: "text-purple-500" },
  { title: "Commerce", count: "150+ Colleges", icon: <BarChart size={32} />, color: "bg-yellow-100 dark:bg-yellow-900/30", textColor: "text-yellow-500" },
  { title: "Law", count: "90+ Colleges", icon: <ScrollText size={32} />, color: "bg-red-100 dark:bg-red-900/30", textColor: "text-red-500" },
  { title: "AI Powered", count: "Recommendations", icon: <Lightbulb size={32} />, color: "bg-indigo-100 dark:bg-indigo-900/30", textColor: "text-indigo-500" },
];

type CardProps = {
  title: string;
  count: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
};

const CategoryCard = ({ title, count, icon, color, textColor }: CardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="transition-all duration-300"
    >
      <Card className="shadow-lg hover:-translate-y-1 transition-transform duration-300border border-gray-200 dark:border-gray-700 bg-muted">
        <CardContent className="p-5 flex flex-col items-center">
          <div className={`w-full h-24 rounded-md flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <h3 className="mt-3 text-sm font-semibold">{title}</h3>
          <span className={`text-sm font-semibold ${textColor}`}>{count}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CategoryGrid = () => {
  return (
    <section className="flex flex-col w-full items-center text-center py-12 px-6 sm:px-10 md:px-12">
      <div className="bg-muted rounded-xl shadow-2xl overflow-hidden p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-blue-50 dark:border-neutral-700 w-full">
        <div className="  p-6 sm:p-8 backdrop-brightness-200 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
          </div>
        </div>
      </div>

      {/* Animated Down Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="mt-6 text-blue-500 dark:text-blue-400"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

export default CategoryGrid;
