import React from 'react';
import { CollegeCard } from '@/components/CollegeCard';
import { HorizontalCarousel } from '@/components/CollegeCarousel';
import useFetch from '@/hooks/useFetch';
import { getTopTensCollegesService } from '@/services/apis';
import { CollegeCardSkeleton } from '@/skelton/CollegeCardSkeleton';
import { Navigate, useNavigate } from 'react-router-dom';



const AllCollege = () => {
  const { data, loading, error } = useFetch(getTopTensCollegesService);
  const navigate = useNavigate();
  const renderCarousel = (
    title: string,
    streamKey: keyof typeof data,
    gradientFrom: string,
    gradientTo: string
  ) => {
    const collegess = data?.[streamKey] || [];
    const colleges = collegess.sort((a: any, b: any) => {
      const rankA = a.rankingNIRF || Infinity;
      const rankB = b.rankingNIRF || Infinity;
      return rankA - rankB;
    })

    return (
      <HorizontalCarousel title={title} viewAllRoute={`/dashboard/${streamKey}`}>
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
                  navigate(`/dashboard/${streamKey}/${college._id}`)
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
      {renderCarousel("Management Colleges", "management", "from-yellow-600", "to-amber-400")}
      {renderCarousel("Medical Colleges", "medical", "from-red-600", "to-orange-500")}
      {renderCarousel("Arts Colleges", "arts", "from-purple-600", "to-pink-500")}
      {renderCarousel("Science Colleges", "science", "from-green-600", "to-lime-500")}
    </div>
  );
};

export default AllCollege;
