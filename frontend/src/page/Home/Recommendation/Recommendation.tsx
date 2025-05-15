import React, { useEffect, useState } from 'react';
import Steps from './Steps';
import StreamResult from './StreamResult';
import ExploreMore from './ExploreMore';
import { getAllCitiesService } from '@/services/apis';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from '@/hooks/reduxHook';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

const ProfileAlert: React.FC<{ open: boolean; navigate: (path: string) => void }> = ({ open, navigate }) => {
  const handleNavigate = () => {
    navigate("/dashboard/profile");
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Complete Your Profile</DialogTitle>
          <DialogDescription className="mt-2 text-gray-600">
            Please fill out all your profile details before using this feature.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleNavigate} className="w-full mt-4">
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Recommendation = () => {
  const [viewResultStep, setViewResultStep] = useState<number>(1);
  const [streamResult, setStreamResult] = useState<string>("");
  const [citys, setCity] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState<string | null>(null);
  const [profileAlertOpen, setProfileAlertOpen] = useState<boolean>(false);
  const { student, studentEducation } = useAppSelector((state) => state.student)
  const navigate = useNavigate();

  console.log("student", student);
  console.log("studentEducation", studentEducation);

  useEffect(() => {
    getAllCitiesService(setCity);
  }, []);

  const handelWithoutAi = () => {
    // check student and studentEducation object is not empty
    if (!student || Object.keys(student).length === 0 || !studentEducation || Object.keys(studentEducation).length === 0) {
      setProfileAlertOpen(true);
      return;
    }
    setSelectionMode("manual");
  };

  const handleAiSelection = () => {
    // check student and studentEducation object is not empty
    if (!student || Object.keys(student).length === 0 || !studentEducation || Object.keys(studentEducation).length === 0) {
      setProfileAlertOpen(true);
      return;
    }
    setSelectionMode("ai");
  };

  const UsingAi = () => {
    return (
      <div >
        {viewResultStep === 1 && <Steps serViewResultStep={setViewResultStep} setStreamResult={setStreamResult} />}
        {viewResultStep === 2 && <StreamResult streamName={streamResult} serViewResultStep={setViewResultStep} />}
        {viewResultStep === 3 && <ExploreMore citys={citys}  withOutAi={true}/>}
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
            onClick={handleAiSelection}
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
  // Render the appropriate component based on selection
  return (
    <div className="min-h-screen bg-gradient-to-br bg-muted/70 py-10">
      <ProfileAlert open={profileAlertOpen} navigate={navigate} />
      {!selectionMode && <SelectionScreen />}
      {selectionMode === "ai" && <UsingAi />}
      {selectionMode === "manual" && <ExploreMore citys={citys} withOutAi={true}/>}
    </div>
  );
};
export default Recommendation;