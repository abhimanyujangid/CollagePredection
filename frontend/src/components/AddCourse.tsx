import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Plus, Minus, Loader } from "lucide-react";

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
    FormLabel,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormFieldComponent from "./FormFieldComponent";
import NumberFormField from "./NumberFormField";
import TextareaFormField from "./TextareaFormField";
import SelectFormField from "./SelectFormField";
import UserAvatar from "./UserAvatar";
import FileUploadButton from "./FileUploadButton";
import { COLLEGE_STREAMS, COLLEGE_TYPES, INDIAN_STATE } from "@/constant/dropDownData";
import { collegeSchema, courseSchema, ICollege, ICourse } from "@/ZODtypes/college";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { createCollegeAction } from "@/store/auth/collegeSlice";


export function AddCourse({ streamId , streamName,examName}: {examName:string, streamId?: string, streamName?: string }) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const loading = false;

    const form = useForm<ICourse>({
        resolver: zodResolver(courseSchema),
        defaultValues: {

        },
    });




    const onSubmit = async (data: ICourse) => {
        try {

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>
                        Add a new course to the stream
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh] px-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                            {/* Basic Information */}
                            <div className="grid grid-cols-1 gap-4">


                                <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-3">

                                    <FormLabel>Stream Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Enter stream name"
                                            value={streamName}
                                            disabled
                                        />
                                    </div>

                                    <SelectFormField
                                        control={form.control}
                                        name="branches"
                                        label="Branches Type"
                                        options={["Engineering", "Medical", "Management", "Law", "Arts", "Science"] as string[]}
                                        placeholder="Select type"
                                    // disabled={loading}
                                    />

<NumberFormField
                                        control={form.control}
                                        name="seats"
                                        label="seats Ranking"
                                        placeholder="Enter NIRF ranking"
                                    // disabled={loading}
                                    />

                                    
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                    <FormLabel>Exam Name</FormLabel>
                                    <Input
                                            type="text"
                                            placeholder="Enter stream name"
                                            value={examName}
                                            disabled
                                        />
                                    </div>
                                        
                                    <NumberFormField
                                        control={form.control}
                                        name="minimumEntranceScore"
                                        label="Minimum Entrance Score"
                                        placeholder="Enter minimum entrance score"
                                    // disabled={loading}
                                    />
                                </div>
                            </div>




                            <DialogFooter>
                                <Button disabled={loading} type="submit">
                                    {loading ? <Loader size={20} /> : "Create College"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}