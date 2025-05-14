import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { UniqueIdentifier } from '@dnd-kit/core';
import { INDIAN_STATE } from '@/constant/dropDownData';
import { getAllStreamsService, getCourse, getCourseByStreamName } from '@/services/apis';
import { useAppSelector } from '@/hooks/reduxHook';
import axios from 'axios';

const PRIORITIES = [
  { id: "teacherLeanerRatio", label: "Teacher-Learner Ratio", description: "Number of students per teacher." },
  { id: "researchScore", label: "Research Score", description: "Quality and quantity of institutional research." },
  { id: "graducationOutcome", label: "Graduation Outcome", description: "Rate of successful graduate completions." },
  { id: "perceptionScore", label: "Perception Score", description: "Reputation among peers and employers." },
  { id: "campusLife", label: "Campus Life", description: "Extracurricular and campus environment." },
  { id: "infrastructureScore", label: "Infrastructure", description: "Facilities and resources on campus." },
  { id: "alumniScore", label: "Alumni Network", description: "Strength and reach of alumni community." },
  { id: "placementScore", label: "Placement Score", description: "Job placement success after graduation." }
];

function SortableItem({ id, label, description }: { id: UniqueIdentifier; label: string; description: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="p-4 rounded-lg mb-3 bg-muted/20 shadow-md cursor-move hover:bg-gray-750 transition-colors"
    >
      <p className="font-medium text-base">{label}</p>
      <p className="text-sm  mt-1">{description}</p>
    </div>
  );
}

interface ExploreMoreProps {
  citys: string[];
  withOutAi?: boolean;
}

const ExploreMore: React.FC<ExploreMoreProps> = ({ citys, withOutAi }) => {
  // Redux selectors for streams and courses
  const [streams, setAllStreams] = useState<any[]>([]);
  const [courses, setCourse] = useState<any[]>([]);

  useEffect(() => {
      getAllStreamsService(setAllStreams);
      getCourse(setCourse)
  },[]);



  const [step, setStep] = useState(1);
  const [preferredLocation, setPreferredLocation] = useState<string>('nearby');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [priorities, setPriorities] = useState(PRIORITIES);
  
  // New states for the additional step and results
  const [selectedStream, setSelectedStream] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const { student } = useAppSelector((state) => state.student)

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = priorities.findIndex(item => item.id === active.id);
      const newIndex = priorities.findIndex(item => item.id === over.id);
      setPriorities(arrayMove(priorities, oldIndex, newIndex));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    const payload = {
      selectedCity: preferredLocation === 'anywhere' ? "anywhere" : preferredLocation === 'custom' ? city : student?.city,
      location: {
        state: preferredLocation === 'anywhere' ? "anywhere" : preferredLocation === 'custom' ? state : student?.state,
      },
      priorities: priorities.map(p => p.id),
      ...(withOutAi && { 
        branch:"engineering",
        selectedStream,
        course:selectedCourse
      })
    };

    console.log("Submitted Data:", payload);
    
    // Simulating API call
    try {
      // Replace with actual API call
     const res = await axios.post(
        "http://127.0.0.1:8000/api/recommendations",payload)

      setSelectedCourse('');
      setSelectedStream('');
      setCity('');
      setState('');
      setPreferredLocation('nearby');
      
      // Mock result data
      setResult({
        success: true,
        data: {
          colleges: [
            { name: "Top College 1", rating: 4.8 },
            { name: "Top College 2", rating: 4.7 },
            { name: "Top College 3", rating: 4.5 }
          ]
        },
        message: "Successfully fetched recommendations!"
      });
    } catch (error) {
      setResult({
        success: false,
        message: "Failed to fetch recommendations."
      });
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Total steps based on withOutAi flag
  const totalSteps = withOutAi ? 3 : 2;

  // Render loading state or results if we're done with steps
  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
          <p className="text-lg font-medium">Finding your ideal colleges...</p>
          <p className="text-sm text-muted-foreground">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Your College Recommendations</CardTitle>
            <CardDescription>{result.message}</CardDescription>
          </CardHeader>
          <CardContent>
            {result.success ? (
              <div className="space-y-4">
                {result.data.colleges.map((college: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{college.name}</span>
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">
                        {college.rating}/5.0
                      </span>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4" onClick={() => setResult(null)}>
                  Start Over
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-red-500">{result.message}</p>
                <Button className="mt-4" onClick={() => setResult(null)}>
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Find Your Ideal College</h1>
          <div className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step/totalSteps)*100}%` }}></div>
        </div>
      </div>

      {withOutAi && step === 1 && (
        <Card className="mb-6 border-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Select Stream and Course</CardTitle>
            <CardDescription>Choose your preferred academic field</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Label className="text-sm font-medium">Stream</Label>
              <Select onValueChange={setSelectedStream} value={selectedStream}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a Stream" />
                </SelectTrigger>
                <SelectContent>
                  {streams?.map((stream: string) => (
                    <SelectItem key={stream} value={stream}>
                      {stream.toLocaleUpperCase()?.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
           {!( selectedStream === "MBA" ||  selectedStream === "BBA") && <div>
              <Label className="text-sm font-medium">Course</Label>
              <Select onValueChange={setSelectedCourse} value={selectedCourse}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course: string) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>}
            <Button
              disabled={!selectedStream }
              className="mt-6 w-full"
              onClick={() => setStep(2)}
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {((withOutAi && step === 2) || (!withOutAi && step === 1)) && (
        <Card className="mb-6 border-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Preferred Study Location</CardTitle>
            <CardDescription>Choose where you'd like to study</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <RadioGroup value={preferredLocation} onValueChange={setPreferredLocation} className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="nearby" id="nearby" />
                <Label htmlFor="nearby" className="flex-1 cursor-pointer">
                  <span className="font-medium">📍 Nearby</span>
                  <p className="text-sm text-muted-foreground">Stay within your State/Country</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="anywhere" id="anywhere" />
                <Label htmlFor="anywhere" className="flex-1 cursor-pointer">
                  <span className="font-medium">✈️ Anywhere</span>
                  <p className="text-sm text-muted-foreground">Open to all locations</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="flex-1 cursor-pointer">
                  <span className="font-medium">🔍 Specific Location</span>
                  <p className="text-sm text-muted-foreground">Enter your preferred Cities/States</p>
                </Label>
              </div>
            </RadioGroup>

            {preferredLocation === 'custom' && (
              <div className="mt-4 space-y-4 p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="text-sm font-medium">City</Label>
                  <Select onValueChange={setCity} value={city}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a City" />
                    </SelectTrigger>
                    <SelectContent>
                    {citys?.map((city: string) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">State</Label>
                  <Select onValueChange={setState} value={state}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a State" />
                    </SelectTrigger>
                    <SelectContent>
                     {INDIAN_STATE?.map((state: string) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                     ))}
                    
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {withOutAi && (
                <Button 
                  variant="outline" 
                  onClick={goBack} 
                  className="flex-1"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
              )}
              <Button
                disabled={preferredLocation === 'custom' && (!city || !state)}
                className="flex-1"
                onClick={() => setStep(withOutAi ? 3 : 2)}
              >
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {((withOutAi && step === 3) || (!withOutAi && step === 2)) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Rank Your Priorities</CardTitle>
            <CardDescription>Drag and reorder these factors based on their importance to you</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-muted/40 p-3 rounded-lg mb-5">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> The top-ranked factors will have a higher influence on your college recommendations.
                Drag the most important criteria to the top of the list.
              </p>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={priorities.map(p => p.id)} strategy={verticalListSortingStrategy}>
                {priorities.map((priority, index) => (
                  <SortableItem 
                    key={priority.id} 
                    id={priority.id} 
                    label={`${index + 1}. ${priority.label}`} 
                    description={priority.description} 
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={goBack} 
                className="flex-1"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1"
              >
                Submit & Get Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExploreMore;