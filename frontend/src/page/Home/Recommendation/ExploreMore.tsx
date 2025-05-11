import React, { useState } from 'react';
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
}

const ExploreMore: React.FC<ExploreMoreProps> = ({ citys }) => {

  const [step, setStep] = useState(1);
  const [preferredLocation, setPreferredLocation] = useState<string>('nearby');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [priorities, setPriorities] = useState(PRIORITIES);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = priorities.findIndex(item => item.id === active.id);
      const newIndex = priorities.findIndex(item => item.id === over.id);
      setPriorities(arrayMove(priorities, oldIndex, newIndex));
    }
  };

  const handleSubmit = () => {
    const payload = {
      locationPreference: preferredLocation,
      selectedCity: city,
      selectedState: state,
      priorities: priorities.map(p => p.id)
    };

    console.log("Submitted Data:", payload);
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Find Your Ideal College</h1>
          <div className="text-sm text-muted-foreground">
            Step {step} of 2
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step/2)*100}%` }}></div>
        </div>
      </div>

      {step === 1 && (
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

            <Button
              disabled={preferredLocation === 'custom' && (!city || !state)}
              className="mt-6 w-full"
              onClick={() => setStep(2)}
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
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