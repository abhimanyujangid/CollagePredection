import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import FieldOfStudyStep from "./FieldOfStudyStep";
import { stepData } from "@/constant/data";

const TOTAL_STEPS = 4;
const ITEMS_PER_STEP = Math.ceil(stepData.length / TOTAL_STEPS);

const Steps = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);

  // Slice the data for the current step
  const startIdx = (currentStep - 1) * ITEMS_PER_STEP;
  const currentItems = stepData.slice(startIdx, startIdx + ITEMS_PER_STEP);

  const handlePageNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePagePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setIsDisabled(selectedFields.length === 0);
  }, [selectedFields]);

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
        <Button onClick={handlePageNext} disabled={currentStep === TOTAL_STEPS} variant="outline">
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default Steps;
