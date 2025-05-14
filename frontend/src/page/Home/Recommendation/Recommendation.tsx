import React, { useEffect, useState } from 'react';
import Steps from './Steps';
import StreamResult from './StreamResult';
import ExploreMore from './ExploreMore';
import { getAllCitiesService } from '@/services/apis';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Recommendation = () => {
  const [viewResultStep, setViewResultStep] = useState<number>(1);
  const [streamResult, setStreamResult] = useState<string>("");
  const [citys, setCity] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState<string | null>(null);

  useEffect(() => {
    getAllCitiesService(setCity);
  }, []);

  const handelWithoutAi = ()=>{
    setSelectionMode("manual")
  }

  const UsingAi = () => {
    return (
      <div className=" shadow-lg rounded-lg p-6">
        {viewResultStep === 1 && <Steps serViewResultStep={setViewResultStep} setStreamResult={setStreamResult} />}
        {viewResultStep === 2 && <StreamResult streamName={streamResult} serViewResultStep={setViewResultStep} />}
        {viewResultStep === 3 && <ExploreMore citys={citys}  withOutAi={false}/>}
      </div>
    );
  };

  const SelectionScreen = () => {
    return (
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-extrabold text-center mb-8 ">
          How would you like to get your result?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            className="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg border"
            onClick={() => setSelectionMode("ai")}
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Using AI</CardTitle>
              <CardDescription >
                Get personalized college recommendations using our AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90">
                Select
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg border border-gray-200"
            onClick={handelWithoutAi}
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold ">I know what I want to be</CardTitle>
              <CardDescription className="">
                Search for colleges using your own criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90">
                Select
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Render the appropriate component based on selection
  return (
    <div className="min-h-screen bg-gradient-to-br bg-muted/70 py-10">
      {!selectionMode && <SelectionScreen />}
      {selectionMode === "ai" && <UsingAi />}
      {selectionMode === "manual" && <ExploreMore citys={citys} withOutAi={true}/>}
    </div>
  );
};

export default Recommendation;