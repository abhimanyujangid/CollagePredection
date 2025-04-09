import AddStreamModal from '@/components/AddStreamModal';
import CollegeInfoCard from '@/components/CollegeInfoCard.tsx';
import useFetch from '@/hooks/useFetch';
import { getCollegeByIdService } from '@/services/apis';
import { Stream } from '@/ZODtypes/streams';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewCollege() {
  const [streams, setStreams] = useState<Stream[]>([]);


  const collegeId = useParams().collegeId || '';

  // Fetch college data using collegeId if needed
  const {data , error, loading} = useFetch(getCollegeByIdService, collegeId);



  return (
      <div>
        <CollegeInfoCard data={data?.data}  />
    </div>
  );
}

export default ViewCollege;
