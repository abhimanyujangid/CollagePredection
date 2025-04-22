import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
    Form,
    FormLabel,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import NumberFormField from "./NumberFormField";
import SelectFormField from "./SelectFormField";
import { courseSchema, ICourse } from "@/ZODtypes/college";
import { useAppDispatch } from "@/hooks/reduxHook";
import { createCourseOfStreamService, updateCourseOfStreamService } from "@/services/apis";
import { toast } from "sonner";
import { ENGINEERING_COURSES } from "@/constant/dropDownData";
import { Loader } from "lucide-react";
import { updateCourseById } from "@/store/auth/collegeInfo";


interface IAddCourse {
    streamId?: string;
    streamName?: string;
    examName?: string;
    edit?: boolean;
    seat?: number;
    minimumEntranceScore?: number;
    courseId?: string;
    courseStream: string[];

}

export function AddCourse({ streamId, streamName, examName, edit = false, seat, minimumEntranceScore, courseId, courseStream }: IAddCourse) {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const form = useForm<ICourse>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            branches: streamName || "",
            seats: seat || 0,
            minimumEntranceScore: minimumEntranceScore || 0,
        },
    });

    useEffect(() => {
        if (streamName && seat !== undefined && minimumEntranceScore !== undefined) {
            form.setValue('branches', streamName);
            form.setValue('seats', seat);
            form.setValue('minimumEntranceScore', minimumEntranceScore);
        }
    }, [streamName, seat, minimumEntranceScore, form]);




    const onSubmit = async (data: ICourse) => {
        try {
            setLoading(true);
            if (courseId) {
                const response = await updateCourseOfStreamService(courseId as string, data);
                dispatch(updateCourseById({ courseId, updatedCourse: data }));
                setOpen(false);
                toast.success("Course updated successfully");
            } else {
                const response = await createCourseOfStreamService(streamId as string, data);
                toast.success("Course created successfully");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{edit ? "Edit " : "Add Course"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{edit ? "Edit" : "Add New"} Course</DialogTitle>
                    <DialogDescription>
                        {edit ? "Edit" : "Add a new"} course to the stream
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
                                        options={courseStream as string[]}
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
                                    {loading ? <Loader size={20} /> :
                                        edit ? "Update Course" : "Add Course"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}