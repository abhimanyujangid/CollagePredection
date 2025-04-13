import { Building2, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface CollegeCardProps {
    name: string;
    location: string;
    logoUrl?: string;
    nirfRank?: number;
    yearlyFees?: string;
    collegeType?: string;
    type?: string;
    topCourses?: string[];
    gradientFrom?: string;
    gradientTo?: string;
    onViewClick?: () => void;
}

export function CollegeCard({
    name,
    location,
    logoUrl,
    nirfRank,
    yearlyFees,
    collegeType = "Private",
    type = "Engineering",
    topCourses = [],
    gradientFrom = "from-blue-600",
    gradientTo = "to-cyan-500",
    onViewClick,
}: CollegeCardProps) {
    return (
        <Card className="w-[300px] overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white p-4`}>
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white/20">
                        <AvatarImage src={logoUrl} alt={name} />
                        <AvatarFallback>
                            <Building2 className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-base leading-tight">{name}</h3>
                        <p className="text-xs text-white/80">{location}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="space-y-3">
                    <div className="flex gap-3">
                        {nirfRank && (
                            <div className="flex-1 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                                <p className="text-xs text-orange-800 dark:text-orange-300">NIRF Rank</p>
                                <p className="text-base font-semibold text-orange-900 dark:text-orange-200">
                                    #{nirfRank}
                                </p>
                            </div>
                        )}

                        {yearlyFees && (
                            <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                                <p className="text-xs text-green-800 dark:text-green-300">Yearly Fees</p>
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
                            {collegeType}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                        >
                            {type}
                        </Badge>
                    </div>

                    {topCourses && topCourses.length > 0 && (
                        <div className="space-y-1.5">
                            <p className="text-xs font-medium text-muted-foreground">Top Courses</p>
                            <div className="flex flex-wrap gap-1.5">
                                {topCourses.map((course, index) => (
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
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
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