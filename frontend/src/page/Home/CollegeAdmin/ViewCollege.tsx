import CollegeInfoCard from '@/components/CollegeInfoCard.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import useFetch from '@/hooks/useFetch';
import { getCollegeByIdService } from '@/services/apis';
import { setCollegeData } from '@/store/auth/collegeInfo';
import { Stream } from '@/ZODtypes/streams';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewCollege() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const dispatch = useAppDispatch();


  const collegeId = useParams().collegeId || '';

  // Fetch college data using collegeId if needed
  const {data , error, loading} = useFetch(getCollegeByIdService, collegeId);


  useEffect(() => {
    if (data?.data) {
     dispatch(setCollegeData(data?.data))
    }
  }, [data]);


  return (
      <div>
        <CollegeInfoCard />
    </div>
  );
}

export default ViewCollege;
