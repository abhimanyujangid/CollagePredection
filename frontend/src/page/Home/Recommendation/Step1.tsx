import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Gavel,
    Globe,
    Heart,
    LineChart,
    Palette,
    Pencil,
    Settings,
} from "lucide-react";


const fields = [
    {
        id: "engineering",
        title: "Engineering",
        description:
            "Computer, Mechanical, Civil, Electrical, and other engineering fields.",
        icon: <Settings className="h-6 w-6" />,
        color: "bg-blue-500",
    },
    {
        id: "medical",
        title: "Medical",
        description:
            "MBBS, Dentistry, Pharmacy, Nursing, and healthcare fields.",
        icon: <Heart className="h-6 w-6" />,
        color: "bg-green-500",
    },
    {
        id: "arts",
        title: "Arts",
        description: "Literature, Fine Arts, Design, Theater, and humanities.",
        icon: <Pencil className="h-6 w-6" />,
        color: "bg-purple-500",
    },
    {
        id: "commerce",
        title: "Commerce",
        description:
            "Business, Economics, Accounting, Finance, and marketing.",
        icon: <LineChart className="h-6 w-6" />,
        color: "bg-yellow-400",
    },
    {
        id: "law",
        title: "Law",
        description:
            "Legal studies, corporate law, criminal law, and international law.",
        icon: <Gavel className="h-6 w-6" />,
        color: "bg-red-500",
    },
    {
        id: "others",
        title: "Others",
        description:
            "Agriculture, Hospitality, Aviation, and other specialized fields.",
        icon: <Globe className="h-6 w-6" />,
        color: "bg-gray-500",
    },
];

interface Step1Props {
    selected: string | null;
    setSelected: (id: string) => void;
}
const Step1: React.FC<Step1Props> = ({ selected, setSelected }) => {
  return (
    <>
     {/* Title */}
     <h2 className="text-2xl font-semibold mt-6 mb-6 text-foreground">
                    Which field of study interests you the most?
                </h2>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {fields.map((field) => (
                        <Card
                            key={field.id}
                            onClick={() => setSelected(field.id)}
                            className={`cursor-pointer transition-all ${selected === field.id
                                    ? "border-primary ring-2 ring-primary"
                                    : "hover:border-muted-foreground"
                                }`}
                        >
                            <CardHeader className="flex flex-row items-center gap-3">
                                <div
                                    className={`rounded-md p-2 text-white ${field.color}`}
                                >
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
                </div></>
  )
}

export default Step1