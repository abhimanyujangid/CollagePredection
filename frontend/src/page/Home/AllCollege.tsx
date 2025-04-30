import React from 'react';
import { CollegeCard } from '@/components/CollegeCard';
import { HorizontalCarousel } from '@/components/CollegeCarousel';
import useFetch from '@/hooks/useFetch';
import { getTopTensCollegesService } from '@/services/apis';

// Skeleton loader for CollegeCard
const CollegeCardSkeleton = () => (
  <div className="w-72 h-80 bg-gray-200 animate-pulse rounded-xl shadow-md"></div>
);

const AllCollege = () => {
  const { data, loading, error } = useFetch(getTopTensCollegesService);

  const renderCarousel = (
    title: string,
    streamKey: keyof typeof data,
    gradientFrom: string,
    gradientTo: string
  ) => {
    const colleges = data?.[streamKey] || [];

    return (
      <HorizontalCarousel title={title} viewAllRoute="/dashboard/all-colleges">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <CollegeCardSkeleton key={index} />
            ))
          : colleges.length > 0
          ? colleges.map((college: any, index: number) => (
              <CollegeCard
                key={college._id || index}
                name={college.collegeName}
                location={college.address || "Unknown"}
                logo_tag={college.logo_tag}
                nirfRank={college.rankingNIRF}
                yearlyFees={college.instituteId} // You can replace this with `college.fees` if available
                collegeType={college.type}
                streamType={college?.streams}
                topCourses={
                  college.streams?.flatMap((stream: any) =>
                    stream.courses?.map((course: any) => course.branches)
                  ) || []
                }
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
                onViewClick={() =>
                  alert(`View details for ${college.collegeName}`)
                }
              />
            ))
          : <div className="text-gray-500 px-4">No colleges available.</div>}
      </HorizontalCarousel>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {renderCarousel("Engineering Colleges", "engineering", "from-blue-600", "to-cyan-500")}
      {renderCarousel("Medical Colleges", "medical", "from-red-600", "to-orange-500")}
      {renderCarousel("Arts Colleges", "arts", "from-purple-600", "to-pink-500")}
      {renderCarousel("Science Colleges", "science", "from-green-600", "to-lime-500")}
      {renderCarousel("Management Colleges", "management", "from-yellow-600", "to-amber-400")}
    </div>
  );
};

export default AllCollege;
