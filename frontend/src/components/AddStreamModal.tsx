import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Loader } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import NumberFormField from "./NumberFormField";
import SelectFormField from "./SelectFormField";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import {  DEGREE_TYPES, EXAM_OPTIONS } from "@/constant/dropDownData";
import { useParams } from "react-router-dom";
import { create } from "domain";
import { createStreamService } from "@/services/apis";
import { add, addSeconds } from "date-fns";
import { addStream } from "@/store/auth/collegeInfo";
import { toast } from "sonner";

// Define the Stream schema using Zod
const streamSchema = z.object({
    streamName: z.string().min(1, "Stream name is required"),
    type: z.enum(["undergraduate", "postgraduate", "diploma"]),
    duration: z.number().min(0, "Duration must be a positive number"),
    fees: z.number().min(0, "Fees must be a positive number"),
    eligibilityCriteria: z.object({
        minTenthPercentage: z.number().min(0).max(100),
        minTwelfthPercentage: z.number().min(0).max(100),
        requiredExams: z.string().min(1, "At least one exam is required"),
    })
});

// Interface for Stream type
export interface IStream extends z.infer<typeof streamSchema> {
    _id?: string;
}

// Create a new action for adding streams


export function AddStreamDialog() {
    const [open, setOpen] = useState(false);
    const [requiredExams, setRequiredExams] = useState<string[]>([""]);
    const dispatch = useAppDispatch();
    const { collegeId } = useParams<{ collegeId: string }>();
   const [loading, setLoading] = useState(false);

    const form = useForm<IStream>({
        resolver: zodResolver(streamSchema),
        defaultValues: {
            type: "undergraduate",
            duration: 4,
            fees: 0,
            eligibilityCriteria: {
                minTenthPercentage: 60,
                minTwelfthPercentage: 60,
                requiredExams: []
            }
        },
    });

    


    useEffect(() => {
        if (open) {
            setRequiredExams([""]);
            form.reset();
        }
    }, [open, form]);

    const onSubmit = async (data: IStream) => {
        try {
            setLoading(true);
           const response = await createStreamService(collegeId || "", data);
            form.reset();
            toast.success("Stream added successfully");
            setOpen(false);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Stream</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Stream</DialogTitle>
                    <DialogDescription>
                        Add a new stream to the system. Fill in all the required information.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh] px-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 gap-4">
                                <SelectFormField
                                    control={form.control}
                                    name="streamName"
                                    label="Stream Name"
                                    options={DEGREE_TYPES as string[]}
                                    placeholder="Enter stream name"
                                    disabled={loading} 
                                />

                                <SelectFormField
                                    control={form.control}
                                    name="type"
                                    label="Stream Type"
                                    options={["undergraduate", "postgraduate", "diploma"]}
                                    placeholder="Select type"
                                    disabled={loading}
                                />
                            </div>

                            {/* Stream Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <NumberFormField
                                    control={form.control}
                                    name="duration"
                                    label="Duration (Years)"
                                    placeholder="Enter duration"
                                    disabled={loading}
                                />
                                <NumberFormField
                                    control={form.control}
                                    name="fees"
                                    label="Annual Fees (₹)"
                                    placeholder="Enter fees"
                                    disabled={loading}
                                />
                            </div>

                            {/* Eligibility Criteria */}
                            <div className="space-y-4">
                                <Label className="text-base">Eligibility Criteria</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <NumberFormField
                                        control={form.control}
                                        name="eligibilityCriteria.minTenthPercentage"
                                        label="Min 10th Percentage"
                                        placeholder="Enter percentage"
                                        disabled={loading}
                                    />
                                    <NumberFormField
                                        control={form.control}
                                        name="eligibilityCriteria.minTwelfthPercentage"
                                        label="Min 12th Percentage"
                                        placeholder="Enter percentage"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Required Exams */}
                            <div className="space-y-2">
                            <SelectFormField
                                control={form.control}
                                name="eligibilityCriteria.requiredExams"
                                label="Required Exams"
                                options={EXAM_OPTIONS as string[]}
                                placeholder="Select exams"
                                disabled={loading}
                            />
                            </div>

                            <DialogFooter>
                                <Button disabled={loading} type="submit">
                                    {loading ? <Loader size={20}/> : "Add Stream"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default AddStreamDialog;