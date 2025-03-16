import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight, Circle } from "lucide-react";
import SideViewOutter from "./SideViewOutter";
import { Button } from "../ui/button";

const CompleteQuestion = () => {
  return (
    <SideViewOutter>
      <Card className="p-3" >
        <CardHeader>
          <div className="flex justify-between text-xs ">
            <span>Step 2 of 6</span>
            <span className="text-blue-500 dark:text-blue-400 font-medium">33%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-blue-500"></div>
          </div>
        </CardHeader>
        
        <CardContent>
          <CardTitle className="text-lg font-semibold">Where would you like to study?</CardTitle>
          <div className="space-y-3 mt-4">
            {["Nearby (My State/Country)", "Anywhere (Open to all locations)", "Enter Preferred Cities/States"].map((option, index) => (
              <div key={index} className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500">
                <Circle className="w-6 h-6 text-gray-400 dark:text-gray-600 mr-3" />
                <span className="text-gray-900 dark:text-white font-medium">{option}</span>
              </div>
            ))}
          </div>
        </CardContent>
        
        <div className="flex justify-between mt-4">
          <Button className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </SideViewOutter>
  );
};

export default CompleteQuestion;