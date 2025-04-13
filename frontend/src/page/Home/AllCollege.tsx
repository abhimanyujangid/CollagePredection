import React from 'react';
import { CollegeCard } from '@/components/CollegeCard';
import { HorizontalCarousel } from '@/components/CollegeCarousel';

const AllCollege = () => {
  const arr = Array.from({ length: 20 });

  return (
    <div className='flex flex-col gap-4'>
      <HorizontalCarousel
        title="Engineering Colleges"
        viewAllRoute="/dashboard/all-colleges"
      >
        {arr.map((_, index) => (
          <CollegeCard
            key={index}
            name="BITS Pilani"
            location="Pilani, India"
            logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png"
            nirfRank={27}
            yearlyFees="₹1,95,000"
            collegeType="Private"
            type="Engineering"
            topCourses={["Computer Science", "Electronics", "Mechanical"]}
            gradientFrom="from-blue-600"
            gradientTo="to-cyan-500"
            onViewClick={() => alert("View Details Clicked")}
          />
        ))}
      </HorizontalCarousel>
      <HorizontalCarousel
        title="Medical Colleges"
        viewAllRoute="/dashboard/all-colleges"
      >
        {arr.map((_, index) => (
          <CollegeCard
            key={index}
            name="BITS Pilani"
            location="Pilani, India"
            logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png"
            nirfRank={27}
            yearlyFees="₹1,95,000"
            collegeType="Private"
            type="Engineering"
            topCourses={["Computer Science", "Electronics", "Mechanical"]}
            gradientFrom="from-blue-600"
            gradientTo="to-cyan-500"
            onViewClick={() => alert("View Details Clicked")}
          />
        ))}
      </HorizontalCarousel>
      <HorizontalCarousel
        title="Arts Colleges"
        viewAllRoute="/dashboard/all-colleges"
      >
        {arr.map((_, index) => (
          <CollegeCard
            key={index}
            name="BITS Pilani"
            location="Pilani, India"
            logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png"
            nirfRank={27}
            yearlyFees="₹1,95,000"
            collegeType="Private"
            type="Engineering"
            topCourses={["Computer Science", "Electronics", "Mechanical"]}
            gradientFrom="from-blue-600"
            gradientTo="to-cyan-500"
            onViewClick={() => alert("View Details Clicked")}
          />
        ))}
      </HorizontalCarousel>
      </div>
  );
};

export default AllCollege;
