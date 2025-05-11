import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import FieldOfStudyStep from "./FieldOfStudyStep";
import { stepData } from "@/constant/data";
import axios from "axios";

const TOTAL_STEPS = 4;
const ITEMS_PER_STEP = Math.ceil(stepData.length / TOTAL_STEPS);

type StepData = {
  serViewResultStep: (step: number) => void;
  setStreamResult: (result: string) => void;
}
const Steps = ({serViewResultStep, setStreamResult}:StepData) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Slice the data for the current step
  const startIdx = (currentStep - 1) * ITEMS_PER_STEP;
  const currentItems = stepData.slice(startIdx, startIdx + ITEMS_PER_STEP);

  const handlePageNext = async () => {
    // If we're on the last step and have selections, submit data
    if (currentStep === TOTAL_STEPS) {
      if (selectedFields.length > 0) {
        setIsSubmitting(true);
        try {
            // check filed are ppresent in the stepData
            const features = stepData.reduce((acc, field) => {
              const formattedKey = field.id
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              acc[formattedKey] = selectedFields.includes(field.id) ? 1 : 0;
              return acc;
            }, {});
            
            const response = await axios.post(
              "http://127.0.0.1:8000/predict",
              {
                features, 
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            serViewResultStep(2)
            // console.log(response.data);
            setStreamResult(response.data.prediction);
          
          // Handle successful response here (e.g., redirect to results page)
        } catch (error) {
          console.error('Error submitting preferences:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      // If not on the last step, just go to next step
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePagePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Check if the next/submit button should be disabled
  const isNextButtonDisabled = () => {
    // On last step, only require at least one selection
    if (currentStep === TOTAL_STEPS) {
      return selectedFields.length === 0;
    }
    // On earlier steps, require at least one selection
    // You can adjust this logic if needed
   
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-background rounded-xl shadow-lg border">
      {/* Step Info */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <Progress
          value={Math.min((currentStep / TOTAL_STEPS) * 100, 100)}
          className="h-2"
        />
      </div>

      {/* Step Content */}
      <FieldOfStudyStep
        selected={selectedFields}
        setSelected={setSelectedFields}
        currentItems={currentItems}
      />

      {/* Step Controls */}
      <div className="flex justify-between mt-4">
        <Button onClick={handlePagePrev} disabled={currentStep === 1} variant="outline">
          Previous Step
        </Button>
        <Button 
          onClick={handlePageNext} 
          disabled={isNextButtonDisabled() || isSubmitting} 
          variant="outline"
        >
          {currentStep === TOTAL_STEPS ? (isSubmitting ? "Submitting..." : "Submit") : "Next Step"}
        </Button>
      </div>
    </div>
  );
};

export default Steps;