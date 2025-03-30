import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import FormFieldComponent from "./FormFieldComponent";
import NumberFormField from "./NumberFormField";
import TextareaFormField from "./TextareaFormField";
import SelectFormField from "./SelectFormField";
import UserAvatar from "./UserAvatar";
import FileUploadButton from "./FileUploadButton";
import { COLLEGE_STREAMS, COLLEGE_TYPES, INDIAN_STATE } from "@/constant/dropDownData";

const collegeSchema = z.object({
    collegeName: z.string().min(2, "College name is required"),
    rankingNIRF: z.number().min(0, "Ranking cannot be negative"),
    university: z.string().min(2, "University name is required"),
    type: z.enum(["private", "government", "deemed", "state"]),
    typeOfCollege: z.enum(["Engineering", "Medical", "Management", "Law", "Arts", "Science"]),
    logo: z
        .instanceof(File, { message: "Profile image is required" })
        .refine((file) => file?.type.startsWith("image/"), "Only image files are allowed"),
    address: z.object({
        city: z.string().min(2, "City is required"),
        state: z.string().min(2, "State is required"),
        country: z.string().default("India"),
    }),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    email: z.string().email("Invalid email address"),
    contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
    description: z.string().optional(),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
    placementStatistics: z.object({
        averagePackage: z.number().min(0, "Average package cannot be negative"),
        highestPackage: z.number().min(0, "Highest package cannot be negative"),
        topRecruiters: z.array(z.string()),
    }),
});

type CollegeFormValues = z.infer<typeof collegeSchema>;

export function AddCollegeDialog() {
    const [open, setOpen] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [recruiters, setRecruiters] = useState<string[]>([""]);

    const form = useForm<CollegeFormValues>({
        resolver: zodResolver(collegeSchema),
        defaultValues: {
            type: "private",
            address: { country: "India" },
            rating: 0,
            placementStatistics: {
                averagePackage: 0,
                highestPackage: 0,
                topRecruiters: [],
            },
        },
    });

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("logo", file);
            form.clearErrors("logo");
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const addRecruiter = () => {
        setRecruiters([...recruiters, ""]);
    };

    const removeRecruiter = (index: number) => {
        setRecruiters(recruiters.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (open) {
            setLogoPreview(null);
            setRecruiters([""]);
            form.reset();
        }
    }, [open]);

    const onSubmit = (data: CollegeFormValues) => {
        if (recruiters.length > 0) form.setValue("placementStatistics.topRecruiters", recruiters);

        console.log(data);
        // Here you would typically send the data to your backend
        // setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add College</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New College</DialogTitle>
                    <DialogDescription>
                        Add a new college to the system. Fill in all the required information.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh] px-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Logo Upload */}
                            <div className="flex flex-col items-center space-y-4">
                                <UserAvatar
                                    src={typeof logoPreview === "string" ? logoPreview : undefined}
                                    name={form.watch("logo")}
                                    size="xl"
                                />
                                <FileUploadButton
                                    onChange={handleLogoChange}
                                    label="Upload Logo "
                                    accept="image/*"
                                    errorMessage={form.formState.errors.logo?.message}
                                />
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 gap-4">
                                <FormFieldComponent
                                    control={form.control}
                                    name="collegeName"
                                    label="College Name"
                                    placeholder="Enter college name" />

                                <FormFieldComponent
                                    control={form.control}
                                    name="university"
                                    label="University"
                                    placeholder="Enter university name" />


                                <div className="grid grid-cols-3 gap-4">
                                    <SelectFormField
                                        control={form.control}
                                        name="type"
                                        label="College Type"
                                        options={COLLEGE_TYPES as string[]}
                                        placeholder="Select type"
                                    />
                                    <SelectFormField
                                        control={form.control}
                                        name="typeOfCollege"
                                        label="Type Of College"
                                        options={COLLEGE_STREAMS as string[]}
                                        placeholder="Select type"
                                    />
                                    <NumberFormField
                                        control={form.control}
                                        name="rankingNIRF"
                                        label="NIRF Ranking"
                                        placeholder="Enter NIRF ranking"
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <Label className="text-base">Contact Information</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    <FormFieldComponent
                                        control={form.control}
                                        type="email"
                                        name="email"
                                        label="Email"
                                        placeholder="Enter email address" />
                                    <FormFieldComponent
                                        control={form.control}
                                        name="contactNumber"
                                        label="Contact Number"
                                        placeholder="Enter contact number" />
                                    <FormFieldComponent
                                        type="url"
                                        control={form.control}
                                        name="website"
                                        label="Website"
                                        placeholder="Enter website URL" />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-4">
                                <Label className="text-base">Address</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormFieldComponent
                                        control={form.control}
                                        name="address.city"
                                        label="City"
                                        placeholder="Enter city" />
                                        <SelectFormField
                                        control={form.control}
                                        name="address.state"
                                        label="State"
                                        placeholder=" Select state"
                                        options={INDIAN_STATE as string[]}
                                    />
                                    
                                </div>
                            </div>

                            {/* Placement Statistics */}
                            <div className="space-y-4">
                                <Label className="text-base">Placement Statistics</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <NumberFormField
                                        control={form.control}
                                        name="placementStatistics.averagePackage"
                                        label="Average Package (LPA)"
                                        placeholder="Enter average package"
                                    />

                                    <NumberFormField
                                        control={form.control}
                                        name="placementStatistics.highestPackage"
                                        label="Highest Package (LPA)"
                                        placeholder="Enter highest package"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Top Recruiters</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addRecruiter}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Recruiter
                                        </Button>
                                    </div>
                                    {recruiters.map((recruiter, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Input
                                                placeholder="Enter recruiter name"
                                                value={recruiter}
                                                onChange={(e) => {
                                                    const newRecruiters = [...recruiters];
                                                    newRecruiters[index] = e.target.value;
                                                    setRecruiters(newRecruiters);
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeRecruiter(index)}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <TextareaFormField
                                control={form.control}
                                name="description"
                                label="Description"
                                placeholder="Enter description"
                            />

                            <DialogFooter>
                                <Button type="submit">Save College</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}