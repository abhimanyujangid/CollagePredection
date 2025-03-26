import { useState } from "react";
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
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const collegeSchema = z.object({
    collegeName: z.string().min(2, "College name is required"),
    rankingNIRF: z.number().min(0, "Ranking cannot be negative"),
    university: z.string().min(2, "University name is required"),
    type: z.enum(["private", "government", "deemed", "state"]),
    logo: z.object({
        public_id: z.string().optional(),
        url: z.string().optional(),
    }).optional(),
    address: z.object({
        city: z.string().min(2, "City is required"),
        state: z.string().min(2, "State is required"),
        country: z.string().default("India"),
    }),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    email: z.string().email("Invalid email address"),
    contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
    description: z.string().optional(),
    typeOfCollege: z.enum(["Engineering", "Medical", "Management", "Law", "Arts", "Science"]),
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
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addRecruiter = () => {
        setRecruiters([...recruiters, ""]);
    };

    const removeRecruiter = (index: number) => {
        setRecruiters(recruiters.filter((_, i) => i !== index));
    };

    const onSubmit = (data: CollegeFormValues) => {
        console.log(data);
        // Here you would typically send the data to your backend
        setOpen(false);
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
                                <Avatar className="w-32 h-32">
                                    <AvatarImage src={logoPreview || ""} />
                                    <AvatarFallback>
                                        {'Logo'}
                                    </AvatarFallback>
                                </Avatar>
                                <Button variant="outline" className="w-40" asChild>
                                    <label>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleLogoChange}
                                        />
                                    </label>
                                </Button>
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 gap-4">
                                <FormField
                                    control={form.control}
                                    name="collegeName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>College Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter college name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="university"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>University</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter university name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>College Type</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="private">Private</SelectItem>
                                                        <SelectItem value="government">Government</SelectItem>
                                                        <SelectItem value="deemed">Deemed</SelectItem>
                                                        <SelectItem value="state">State</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="rankingNIRF"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>NIRF Ranking</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter ranking"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <Label className="text-base">Contact Information</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="college@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contactNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter contact number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="url"
                                                        placeholder="https://example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-4">
                                <Label className="text-base">Address</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="address.city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter city" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address.state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter state" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Placement Statistics */}
                            <div className="space-y-4">
                                <Label className="text-base">Placement Statistics</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="placementStatistics.averagePackage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Average Package (LPA)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter average package"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="placementStatistics.highestPackage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Highest Package (LPA)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter highest package"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
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
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter college description..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
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