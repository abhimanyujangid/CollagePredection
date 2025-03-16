import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import SideViewOutter from "./SideViewOutter";
import { Button } from "../ui/button";

const CreateProfile = () => {
  return (
    <SideViewOutter>
      <Card className="py-5 ">
        <CardContent >
          <div className="flex gap-4 mb-4">
            {["Student", "College Admin"].map((item, index) => (
              <div key={index} className="flex items-center bg-white dark:bg-neutral-800 rounded-md px-4 py-2 w-1/2 cursor-pointer border-2 border-primary/30 hover:border-blue-500">
                <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                <span className="text-gray-900 dark:text-white font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {[
              { label: "Full Name", width: "w-40" },
              { label: "Email Address", width: "w-48" },
              { label: "Academic Interest", width: "w-96", icon: true }
            ].map(({ label, width, icon }, index) => (
              <div key={index}>
                <div className="bg-white dark:bg-neutral-800 rounded-md p-2 border flex items-center">
                  <div className={`h-5 ${width} bg-gray-100 dark:bg-neutral-700 rounded`}></div>
                  {icon && <span className="ml-2 text-gray-400">▼</span>}
                </div>
                <div className="text-xs dark:text-gray-400 mt-2 flex ">{label}</div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button className="w-full">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </SideViewOutter>
  );
};

export default CreateProfile;