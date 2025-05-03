// FieldOfStudyStep.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface FieldOfStudyStepProps {
  selected: string[];
  setSelected: (ids: string[]) => void;
  currentItems: any[];
}

const FieldOfStudyStep: React.FC<FieldOfStudyStepProps> = ({ 
  selected, 
  setSelected, 
  currentItems 
}) => {
  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mt-6 mb-6 text-foreground">
        Which field of study interests you the most?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.map((field) => (
          <Card
            key={field.id}
            onClick={() => toggleSelection(field.id)}
            className={`cursor-pointer transition-all ${
              selected.includes(field.id)
                ? "border-primary ring-2 ring-primary"
                : "hover:border-muted-foreground"
            }`}
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div className={`rounded-md p-2 text-white ${field.color}`}>
                {field.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{field.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {field.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default FieldOfStudyStep;