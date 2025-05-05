import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getAllCollegesService } from '@/services/apis';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeCardSkeleton } from '@/skelton/CollegeCardSkeleton';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalize } from '@/utils';
import { Card } from '@/components/ui/card';
import NoCollegesMessage from '@/components/NoCollegesMessage';



const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const {typeOfCollege} = useParams();
  const navigate = useNavigate();
  
  // Function to fetch colleges
  const fetchColleges = async (pageNum) => {
    try {
      setLoading(true);
      const payload = {
        typeOfCollege: typeOfCollege,
        page: pageNum,
        limit: 12, // Smaller batch size for smoother infinite scrolling
      };
      
      const response = await getAllCollegesService(payload);
      console.log("response",response)
      
      if (response?.data.colleges) {
        // If it's the first page, set the colleges array directly
        // Otherwise, append to the existing colleges array
        setColleges(prev => 
          pageNum === 1 
            ? response?.data.colleges
            : [...prev, ...response?.data.colleges]
        );
        
        // If we received fewer colleges than the limit, we've reached the end
        setHasMore(response?.data.colleges.length === payload.limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchColleges(1);
  }, [typeOfCollege]);

  // Intersection observer setup for infinite scrolling
  const lastCollegeElementRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Fetch more colleges when page changes
  useEffect(() => {
    if (page > 1) {
      fetchColleges(page);
    }
  }, [page]);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {colleges.length > 0 ? (
          colleges.map((college, index) => {
            // Add ref to the last element for infinite scrolling
            if (colleges.length === index + 1) {
              return (
                <div ref={lastCollegeElementRef} key={college._id || index}>
                  <CollegeCard
                    name={college.collegeName}
                    location={college.address || "Unknown"}
                    logo_tag={college.logo_tag}
                    nirfRank={college.rankingNIRF}
                    yearlyFees={college.instituteId} 
                    collegeType={college.type}
                    streamType={college?.streams}
                    topCourses={
                      college.streams?.flatMap((stream) =>
                        stream.courses?.map((course) => course.branches)
                      ) || []
                    }
                    gradientFrom="from-blue-600"
                    gradientTo="to-cyan-500"
                    onViewClick={() =>
                      alert(`View details for ${college.collegeName}`)
                    }
                  />
                </div>
              );
            } else {
              return (
                <CollegeCard
                  key={college._id || index}
                  name={college.collegeName}
                  location={college.address || "Unknown"}
                  logo_tag={college.logo_tag}
                  nirfRank={college.rankingNIRF}
                  yearlyFees={college.instituteId} 
                  collegeType={college.type}
                  streamType={college?.streams}
                  topCourses={
                    college.streams?.flatMap((stream) =>
                      stream.courses?.map((course) => course.branches)
                    ) || []
                  }
                  gradientFrom="from-blue-600"
                  gradientTo="to-cyan-500"
                  onViewClick={() =>
                    navigate(`/dashboard/${typeOfCollege}/${college._id}`)
                  }
                />
              );
            }
          })
        ) : !loading ? (
          <NoCollegesMessage
          typeOfCollege={capitalize(typeOfCollege)}
          />
        ) : null}
      </div>
      
      {/* Loading indicators at the bottom */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <CollegeCardSkeleton key={index} />
          ))}
        </div>
      )}
      
      {/* End of list message */}
      {!hasMore && colleges.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default Colleges;