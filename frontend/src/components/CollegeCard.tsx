import { Building2, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { capitalize } from "@/utils";

interface CollegeCardProps {
    name: string;
    location: {
        city: string;
        state: string;
        country?: string;
    }[];
    logo_tag?: string;
    nirfRank?: number;
    yearlyFees?: string;
    collegeType?: string;
    streamType?: [];
    topCourses?: string[];
    gradientFrom?: string;
    gradientTo?: string;
    probability?: string;
    onViewClick?: () => void;
}

export function CollegeCard({
    name,
    location,
    logo_tag,
    probability,
    nirfRank,
    yearlyFees,
    collegeType = "Private",
    streamType = [],
    topCourses = [],
    gradientFrom = "from-blue-600",
    gradientTo = "to-cyan-500",
    onViewClick,
}: CollegeCardProps) {
    return (
        <Card className="w-32 sm:w-80 md:w-96 flex-shrink-0 pb-12 relative">

            <CardHeader className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white p-4 rounded-t-lg`}>
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white/30 shadow-lg">

                        <AvatarFallback className="text-sm text-primary font-bold ">
                            {logo_tag?.toUpperCase() || "NA"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-base leading-tight">{name}</h3>
                        <p className="text-xs text-white/80">{location?.city}, {location?.state}</p>
                        
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="space-y-3">
                    <div className="flex gap-3">
                         {probability && (
                            <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                                <p className="text-xs text-green-800 dark:text-green-300">Probability</p>
                                <p className="text-base font-semibold text-green-900 dark:text-green-200">
                                    {(Number(probability) * 100).toFixed(0)}%
                                </p>
                            </div>
                        )}
                        {nirfRank && (
                            <div className="flex-1 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                                <p className="text-xs text-orange-800 dark:text-orange-300">NIRF Rank</p>
                                <p className="text-base font-semibold text-orange-900 dark:text-orange-200">
                                    #{nirfRank}
                                </p>
                            </div>
                        )}

                        {yearlyFees && (
                            <div className=" bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                                <p className="text-xs text-green-800 dark:text-green-300">Institute Id</p>
                                <p className="text-base font-semibold text-green-900 dark:text-green-200">
                                    {yearlyFees}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        <Badge
                            variant="secondary"
                            className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300"
                        >
                            {capitalize(collegeType)}
                        </Badge>
                        {streamType?.map((type: any, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                            >
                                {capitalize(type?.streamType)}
                            </Badge>
                        ))}
                      
                    </div>

                    {topCourses && topCourses.length > 0 && (
                        <div className="space-x-1.5">
                            <p className="text-xs font-medium text-muted-foreground">Top Course</p>
                            {topCourses.slice(0, 3).map((course, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 
                                 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800"
                                >
                                    {course}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 absolute bottom-0 left-0 right-0 ">
                <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 
                     hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all 
                     duration-200 text-sm py-2"
                    onClick={onViewClick}
                >
                    View Details
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </Button>
            </CardFooter>
        </Card>
    );
}