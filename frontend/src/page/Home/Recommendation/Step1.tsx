import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Brush,
  Music,
  Camera,
  Gamepad2,
  Dumbbell,
  Book,
  Plane,
  Mic,
  HeartHandshake,
  Brain,
  GraduationCap,
  Languages,
  Puzzle,
  Bike,
  PenTool,
  Globe,
  Users,
  Hammer,
  Flower2,
  FlaskConical,
  ClipboardList
} from "lucide-react";
import interests from './fieldsData';



interface Step1Props {
  selected: string | null;
  setSelected: (id: string) => void;
}

const Step1: React.FC<Step1Props> = ({ selected, setSelected }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-6 mb-6 text-foreground">
        Which hobbies or interests excite you the most?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map((item) => (
          <Card
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`cursor-pointer transition-all ${selected === item.id
              ? "border-primary ring-2 ring-primary"
              : "hover:border-muted-foreground"
              }`}
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div className={`rounded-md p-2 text-white ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Step1;
