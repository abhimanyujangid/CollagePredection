import { useEffect, useState } from 'react';
import { AddCollegeDialog } from '@/components/AddCollegeDialog';
import { Card } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { getAdministratorAllCollegesAction } from '@/store/auth/collegeSlice';
import CollegeLIstCard from '@/components/CollegeLIstCard';
import { PaginationNav } from '@/components/CustomPagination';

const AddCollege = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  console.log("selectedFilters",selectedFilters)
  const dispatch = useAppDispatch();
  const { getAll, loading, error } = useAppSelector((state) => state.college);

  const collegeTypes = [
    { id: 'engineering', label: 'Engineering', color: 'blue' },
    { id: 'medical', label: 'Medical', color: 'indigo' },
    { id: 'arts', label: 'Arts', color: 'purple' },
    { id: 'science', label: 'Science', color: 'green' }
  ];

  useEffect(() => {
    // Fetch colleges with filter parameters
    dispatch(getAdministratorAllCollegesAction({ 
      page: currentPage, 
      limit: 10,
      filter: selectedFilters.length > 0 ? selectedFilters : ""
    }));
  }, [dispatch, currentPage, selectedFilters]);
  
  const handleFilterToggle = (filterId) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Colleges</h1>
        <AddCollegeDialog />
      </div>
      
      {/* Filter badges - matching the style in screenshot */}
      <div className="flex flex-wrap gap-2">
        {collegeTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleFilterToggle(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
              selectedFilters.includes(type.id)
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 text-gray-800 hover:bg-gray-100'
            }`}
          >
            {type.label}
            {selectedFilters.includes(type.id) && (
              <span className="ml-1 text-white">✓</span>
            )}
          </button>
        ))}
        {selectedFilters.length > 0 && (
          <button
            onClick={() => setSelectedFilters([])}
            className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active filters display - matching your screenshot */}
      {selectedFilters.length > 0 && (
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map(filterId => {
              const filter = collegeTypes.find(type => type.id === filterId);
              return filter ? (
                <span key={filterId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {filter.label}
                  <button 
                    onClick={() => handleFilterToggle(filterId)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {!getAll?.colleges?.length ? (
            <Card className="flex justify-center items-center p-12 bg-gray-50">
              <div className="text-center">
                <p className="text-gray-500 mb-4">No colleges found</p>
                {selectedFilters.length > 0 && (
                  <p className="text-sm text-gray-400">
                    Try adjusting your filters to see more results
                  </p>
                )}
              </div>
            </Card>
          ) : (
            getAll?.colleges?.map((college, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <CollegeLIstCard college={college} />
              </div>
            ))
          )}
        </div>
      )}

      {getAll?.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <PaginationNav
            currentPage={currentPage}
            totalPages={getAll.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AddCollege;