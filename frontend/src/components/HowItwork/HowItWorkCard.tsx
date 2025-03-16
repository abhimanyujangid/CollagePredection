import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface IHowItWorkCardProps {
  id: number;
  title: string;
  description: string;
  features: string[];
}

const HowItWorkCard = ({ id, title, description, features }: IHowItWorkCardProps) => {
  return (
    <Card className="relative group overflow-hidden border bg-muted border-blue-100 dark:border-neutral-700 max-w-[28rem] my-3 h-full ">
      {/* Glassmorphism decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 dark:bg-blue-600 rounded-full opacity-20 filter blur-xl" />
      
      <CardHeader className="relative z-10 items-start text-start">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white text-xl font-bold mb-4">{id}</span>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
         {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <ul className="space-y-2">
          {features.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HowItWorkCard;
