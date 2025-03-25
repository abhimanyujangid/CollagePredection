import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, School } from "lucide-react";
import { IFeatureCardProps } from "@/ZODtypes/landing";



const FeatureCard = ({  logo, title, description, features }:IFeatureCardProps) => {
    return (
        <Card className="relative p-4 group overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-lg  cursor-pointer">
            {/* Glassmorphism decoration */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-200 dark:bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

            <CardHeader className="relative z-10 flex flex-col justify-start items-start text-start">
                <div className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                    {logo}
                </div>
                <CardTitle className="text-xl font-bold  ">
                    {title}
                </CardTitle>
                <CardDescription className="mt-2">
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

export default FeatureCard;
