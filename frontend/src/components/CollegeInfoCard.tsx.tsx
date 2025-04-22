import React from 'react';
import {
    School,
    Mail,
    Phone,
    Globe,
    MapPin,
    Trophy,
    Building2,
    PlusCircle,
    Trash2,
} from 'lucide-react';
import { Stream } from '@/ZODtypes/streams';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from './ui/skeleton';
import { capitalize } from '@/utils';
import AddStreamDialog from './AddStreamModal';
import { AddCourse } from './AddCourse';
import { ReusableAlertDialog } from './ReusableAlertDialog';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { deleteCourseOfStreamService, deleteStreamByIdService, getConstantDataService, getConstantEntranceExamDataService, getConstantStreamDataService } from '@/services/apis';
import { toast } from 'sonner';
import { deleteCourseById, deleteStreamById } from '@/store/auth/collegeInfo';
import useFetch from '@/hooks/useFetch';



const CollegeInfoCard = () => {
    const college = useAppSelector((state) => state.collegeInfo)
    console.log();
    const dispatch = useAppDispatch();

    if (!college) {
        return (
            <Card className="mb-8">
                <CardHeader>
                    <Skeleton className="w-24 h-24 rounded-xl" />
                    <Skeleton className="w-48 h-6 rounded-md" />
                </CardHeader>
                <Separator />
                <CardContent>
                    <Skeleton className="w-full h-6 rounded-md" />
                    <Skeleton className="w-full h-6 rounded-md" />
                    <Skeleton className="w-full h-6 rounded-md" />
                </CardContent>
            </Card>
        );
    }


    const { data: streams } = useFetch(getConstantStreamDataService, college?.typeOfCollege);
    const { data: exams } = useFetch(getConstantEntranceExamDataService, college?.typeOfCollege);
    const { data: courseStream } = useFetch(getConstantDataService, college?.typeOfCollege);




    const deleteCourse = async (courseId: string) => {
        try {
            const response = await deleteCourseOfStreamService(courseId);
            toast.success('Course deleted successfully');
            dispatch(deleteCourseById({ courseId }));
        } catch (error) {
            toast.error('Error deleting course');
            console.error('Error deleting course:', error);
        }
    }

    const deleteStream = async (streamId: string) => {
        try {
            const response = await deleteStreamByIdService(streamId);
            dispatch(deleteStreamById({ streamId }));
            toast.success('Stream deleted successfully');
        } catch (error) {
            toast.error('Error deleting stream');
            console.error('Error deleting stream:', error);
        }
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center">
                        {college.logo?.url ? (
                            <img src={college.logo?.url} alt="College Logo" className="w-16 h-16 rounded-full" />
                        ) : (
                            <School className="w-12 h-12 text-primary" />
                        )}
                    </div>
                    <div>
                        <CardTitle>{college.collegeName}</CardTitle>
                        <p className="text-muted-foreground">{college.university}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            <span>{college?.type?.charAt(0).toUpperCase() + college?.type?.slice(1)} ({college?.typeOfCollege?.charAt(0).toUpperCase() + college?.typeOfCollege?.slice(1)})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span>
                                {capitalize(college.address?.city)}, {capitalize(college.address?.state)}, {capitalize(college.address?.country)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5" />
                            <span>NIRF Ranking: {college.rankingNIRF}</span>
                        </div>
                    </div>
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            <a
                                href={college.website || 'https://home.iitd.ac.in/'}
                                className="text-primary hover:underline"
                            >
                                {college.website || 'https://home.iitd.ac.in/'}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            <span>{college.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            <span>{college.contactNumber}</span>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                        Available Streams
                    </h2>
                    <AddStreamDialog streams={streams as string[] || []} exams={exams as string[] || []} />
                </div>

                {college?.streams.length > 0 ? (
                    <div className="overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>SR No.</TableHead>
                                    <TableHead>Stream Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Duration (Years)</TableHead>
                                    <TableHead>Fees (₹)</TableHead>
                                    <TableHead>Eligibility</TableHead>
                                    <TableHead>Add Course</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {college.streams.map((stream: Stream, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}.</TableCell>
                                        <TableCell>{capitalize(stream.streamName)}</TableCell>
                                        <TableCell className="capitalize">{stream.type}</TableCell>
                                        <TableCell>{stream.duration}</TableCell>
                                        <TableCell>₹{stream.fees.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <div className="text-sm space-y-1">
                                                <div>10th: {stream.eligibilityCriteria.minTenthPercentage}%</div>
                                                <div>12th: {stream.eligibilityCriteria.minTwelfthPercentage}%</div>
                                                <div>
                                                    Exams:{' '}
                                                    {stream.eligibilityCriteria.requiredExams.join(', ')}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <AddCourse streamId={stream._id} streamName={capitalize(stream.streamName)} examName={stream.eligibilityCriteria.requiredExams.join(', ')}
                                            courseStream={courseStream as string[] || []}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <AddStreamDialog isEdit={true} stream={stream}  />
                                        </TableCell>
                                        <TableCell>
                                            <ReusableAlertDialog
                                                triggerLabel={<Trash2 className="w-4 h-4" />}
                                                title="Confirm Deletion"
                                                description="Are you sure you want to delete this item?"
                                                onConfirm={() => deleteStream(stream._id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No streams added yet. Click the button above to add a stream.
                    </div>
                )}



                <div className="flex justify-between items-center my-6">
                    <h2 className="text-xl font-semibold text-foreground">
                        Available Course
                    </h2>
                </div>

                {college?.streams.length > 0 ? (
                    <div className="space-y-4">
                        {college?.streams.map((stream: Stream, index: number) => (
                            <div
                                key={index}
                                className="rounded-lg border shadow-sm p-4"
                            >
                                <h3 className="text-lg font-semibold mb-2">
                                    {index + 1}. {capitalize(stream.streamName)} 
                                </h3>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow >
                                                <TableHead>Course Name</TableHead>
                                                <TableHead>Seats</TableHead>
                                                <TableHead>Minimum Entrance Score</TableHead>
                                                <TableHead>Edit</TableHead>
                                                <TableHead>Delete</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {stream?.courses?.length > 0 ? (
                                                stream.courses.map((course: any, idx: number) => (
                                                    <TableRow key={idx} >
                                                        <TableCell>{course.branches}</TableCell>
                                                        <TableCell>{course.seats}</TableCell>
                                                        <TableCell>{course.minimumEntranceScore}</TableCell>
                                                        <TableCell>
                                                            <AddCourse streamId={stream._id} streamName={stream.streamName}
                                                                examName={stream.eligibilityCriteria.requiredExams.join(', ')}
                                                                edit={true}
                                                                courseId={course._id}
                                                                minimumEntranceScore={course.minimumEntranceScore}
                                                                seat={course.seats} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <ReusableAlertDialog
                                                                triggerLabel={<Trash2 className="w-4 h-4" />}
                                                                title="Confirm Deletion"
                                                                description="Are you sure you want to delete this item?"
                                                                onConfirm={() => deleteCourse(course._id)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                                                        No courses available.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No course added yet.
                    </div>
                )}

            </CardContent>
        </Card>
    );
};

export default CollegeInfoCard
