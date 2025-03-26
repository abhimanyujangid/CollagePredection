import { useState } from 'react';
import { AddCollegeDialog } from '@/components/AddCollegeDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const mockColleges = [
  { id: 1, name: 'IIT Bombay', university: 'IIT', logo: '/logos/iitb.png', type: 'Public', state: 'Maharashtra', avgPlacement: '18 LPA' },
  { id: 2, name: 'IIT Delhi', university: 'IIT', logo: '/logos/iitd.png', type: 'Public', state: 'Delhi', avgPlacement: '20 LPA' },
  { id: 3, name: 'IIT Madras', university: 'IIT', logo: '/logos/iitm.png', type: 'Public', state: 'Tamil Nadu', avgPlacement: '19 LPA' },
  { id: 4, name: 'BITS Pilani', university: 'BITS', logo: '/logos/bits.png', type: 'Private', state: 'Rajasthan', avgPlacement: '16 LPA' },
  { id: 5, name: 'NIT Trichy', university: 'NIT', logo: '/logos/nitt.png', type: 'Public', state: 'Tamil Nadu', avgPlacement: '12 LPA' },
];

const ITEMS_PER_PAGE = 2;

const AddCollege = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentColleges = mockColleges.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockColleges.length / ITEMS_PER_PAGE);

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='flex justify-end w-full mb-4'>
        <AddCollegeDialog />
      </div>
      
      {currentColleges.map((college) => (
        <Card key={college.id} className='w-full max-w-md p-4 mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar>
              <AvatarImage src={college.logo} alt={college.name} />
            </Avatar>
            <div>
              <h3 className='text-lg font-semibold'>{college.name}</h3>
              <p className='text-sm text-gray-500'>{college.university}</p>
              <p className='text-sm'>{college.type} | {college.state}</p>
              {college.avgPlacement && <p className='text-sm text-green-600'>Avg Placement: {college.avgPlacement}</p>}
            </div>
          </div>
          <Button>Add Stream</Button>
        </Card>
      ))}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink isActive={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AddCollege;