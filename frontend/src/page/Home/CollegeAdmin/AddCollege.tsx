import { useEffect, useState } from 'react';
import { AddCollegeDialog } from '@/components/AddCollegeDialog';
import { Card } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { getAdministratorAllCollegesAction } from '@/store/auth/collegeSlice';
import CollegeLIstCard from '@/components/CollegeLIstCard';
import { PaginationNav } from '@/components/CustomPagination';

const AddCollege = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { getAll, loading, error } = useAppSelector((state) => state.college);

  useEffect(() => {
    // Fetch colleges from the server or perform any side effects here
    dispatch(getAdministratorAllCollegesAction({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

 

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='flex justify-end w-full mb-4'>
        <AddCollegeDialog />
      </div>
      <Card>
        {!loading && getAll?.colleges?.length === 0 ? (
          <p className='text-center'>No colleges found.</p>
        ) : (
          <>
            {getAll?.colleges?.map((college, index) => (
              <div key={college.id || index} className='mb-4 hover:shadow-xl hover:scale-95 transition duration-300 w-[60rem]'>
                <CollegeLIstCard  college={college}  />
              </div>
            ))}
            {getAll?.totalPages >1 &&
              <PaginationNav
              currentPage={getAll?.currentPage || 1}
              totalItems={getAll?.total || 0}
              totalPages={getAll?.totalPages || 1}
              itemsPerPage={10}
              onPageChange={(page) => {
                dispatch(getAdministratorAllCollegesAction({ page, limit: 10 }));
              }}
              />
            }
          </>
        )}
      </Card>
    </div>
  );
};

export default AddCollege;