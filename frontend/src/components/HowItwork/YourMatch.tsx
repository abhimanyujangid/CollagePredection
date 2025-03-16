import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import SideViewOutter from "./SideViewOutter";
import { Filter, Star, MapPin } from "lucide-react";
import { Button } from "../ui/button";

const matches = [
  {
    name: "Engineering Institute of Technology",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    match: "98% Match",
    fees: "₹2.5L/year",
    placement: "95% Placement"
  },
  {
    name: "National Tech University",
    location: "Delhi, NCR",
    rating: 4.5,
    match: "93% Match",
    fees: "₹3.2L/year",
    placement: "90% Placement"
  }
];

const YourMatch = () => {
  return (
    <SideViewOutter>
      <Card className="py-2">
        <CardHeader className="flex flex-row justify-between ">
          <CardTitle className="text-lg flex font-semibold">Your Matches</CardTitle>
          <span className=" text-primary  hove:none  flex items-center cursor-pointer">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </span>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {matches.map((match, index) => (
            <div key={index} className="bg-muted rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-semibold">{match.name}</h5>
                  <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {match.location}
                  </div>
                  <div className="flex items-center text-yellow-500 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(match.rating) ? 'fill-yellow-500' : 'fill-gray-300'}`} />
                    ))}
                    <span className="ml-1 text-sm">{match.rating}</span>
                  </div>
                </div>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-2 py-1 rounded">
                  {match.match}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">{match.fees}</span>
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">{match.placement}</span>
              </div>
            </div>
          ))}
        </CardContent>
        
        <CardFooter>
          <button className="w-full py-2 text-blue-500 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
            View All Matches
          </button>
        </CardFooter>
      </Card>
    </SideViewOutter>
  );
};

export default YourMatch;