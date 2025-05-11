import React, { useEffect, useState } from 'react'
import Steps from './Steps'
import StreamResult from './StreamResult';
import ExploreMore from './ExploreMore';
import { getAllCitiesService } from '@/services/apis';

const Recommendation = () => {
  const [viewResultStep, serViewResultStep] = useState<number>(1);
  const [streamResult, setStreamResult] = useState<string>("");
  const [citys, setCity] = useState<string[]>([]);
  
  
  useEffect(() => {
    getAllCitiesService(setCity);
  }, []);

  return (
    <div>
      { viewResultStep === 1 && <Steps serViewResultStep={serViewResultStep} setStreamResult={setStreamResult}/> }
      { viewResultStep === 2 && <StreamResult streamName={streamResult} serViewResultStep={serViewResultStep}/> }
      { viewResultStep === 3 && <ExploreMore  citys={citys}/> }
    </div>
  )
}

export default Recommendation