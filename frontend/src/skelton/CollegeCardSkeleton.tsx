import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CollegeCardSkeleton = () => {
  return (
    <Card className="w-32 sm:w-80 md:w-96 flex-shrink-0 pb-12 relative">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>

        <div className="space-y-1">
          <Skeleton className="h-3 w-24" />
          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 absolute bottom-0 left-0 right-0">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};
