import React, { useState } from 'react'
import Steps from './Steps'
import StreamResult from './StreamResult';

const Recommendation = () => {
  const [viewResultStep, setViewresultStep] = useState<Number>(1);
  const [streamResult, setStreamResult] = useState<string>("");

  return (
    <div>
      { viewResultStep === 1 && <Steps setViewresultStep={setViewresultStep} setStreamResult={setStreamResult}/> }
      { viewResultStep === 2 && <StreamResult streamName={streamResult} /> }
    </div>
  )
}

export default Recommendation