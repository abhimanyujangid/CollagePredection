
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import Step1 from "./Step1";


const Steps = () => {
    const [fieldOfStydy, setFieldOfStydy] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleNext = () => {
        if (step < 6) {
            setStep(step + 1);
        }
        setIsDisabled(true);
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    useEffect(() => {
        if (fieldOfStydy && step === 1) {
            setIsDisabled(false);
        }
    }, [fieldOfStydy, step]);


    return (
        <>

            <div className="max-w-5xl mx-auto p-6 bg-background rounded-xl shadow-lg border">
                {/* Step Info */}
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Step {step} of 6</p>
                    <Progress value={(step / 6) * 100} className="h-2" />
                </div>

                {step === 1 && <Step1 selected={fieldOfStydy} setSelected={setFieldOfStydy} />}

                {/* Next Button */}
                <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                        Back
                    </Button>
                    <Button className="ml-2" onClick={handleNext} disabled={isDisabled || step === 6}>
                        {step === 6 ? "Finish" : "Next"}
                    </Button>
                </div>
            </div>
        </>
    )
}


export default Steps