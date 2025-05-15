import {
    School, Mail, Phone, Globe, MapPin, Trophy, Building2,
    Trash2, Users, GraduationCap, Eye, BookOpen, PlusCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from './ui/skeleton';
import { capitalize } from '@/utils';
import AddStreamDialog from './AddStreamModal';
import { AddCourse } from './AddCourse';
import { ReusableAlertDialog } from './ReusableAlertDialog';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { 
    deleteCourseOfStreamService, 
    deleteStreamByIdService, 
    getConstantDataService, 
    getConstantEntranceExamDataService, 
    getConstantStreamDataService 
} from '@/services/apis';
import { toast } from 'sonner';
import { deleteCourseById, deleteStreamById } from '@/store/auth/collegeInfo';
import useFetch from '@/hooks/useFetch';
import { useLocation } from 'react-router-dom';
import React from 'react';

// Type definitions
interface Logo {
    url: string;
    public_id?: string;
}

interface Address {
    city: string;
    state: string;
    country: string;
    pincode?: string;
}

interface EligibilityCriteria {
    minTwelfthPercentage: number;
    requiredExams: string[];
}

interface Course {
    _id: string;
    branches: string;
    minimumEntranceScore?: number;
    seats?: number;
}

interface Stream {
    _id: string;
    streamName: string;
    streamType: string;
    duration: number;
    eligibilityCriteria: EligibilityCriteria;
    courses: Course[];
}

interface CollegeInfo {
    collegeName: string;
    university: string;
    logo?: Logo;
    type: string;
    typeOfCollege: string;
    address?: Address;
    rankingNIRF?: number;
    website?: string;
    email?: string;
    contactNumber?: string;
    researchScore?: number;
    perceptionScore?: number;
    graducationOutcome?: number;
    teacherLeanerRatio?: number;
    streams: Stream[];
}

// Component Props interfaces
interface MetricCardProps {
    icon: React.ComponentType<any>;
    title: string;
    value: number | undefined;
    color: 'blue' | 'purple' | 'green' | 'amber' | 'red';
    formatter?: (value: number | undefined) => string;
    indicator?: (value: number | undefined) => React.ReactNode;
}

interface StreamTableProps {
    streams: Stream[];
    deleteStream: (id: string) => Promise<void>;
    isDashboard: boolean;
}

interface CourseListProps {
    streams: Stream[];
    deleteCourse: (id: string) => Promise<void>;
    isDashboard: boolean;
}

// Performance metric card component with TypeScript
const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, color, formatter, indicator }) => {
    // Use fixed color classes instead of string interpolation for Tailwind compatibility
    const colorClasses = {
        blue: {
            bg: "bg-blue-50 dark:bg-blue-900/30",
            text: "text-blue-600 dark:text-blue-400"
        },
        purple: {
            bg: "bg-purple-50 dark:bg-purple-900/30",
            text: "text-purple-600 dark:text-purple-400"
        },
        green: {
            bg: "bg-green-50 dark:bg-green-900/30",
            text: "text-green-600 dark:text-green-400"
        },
        amber: {
            bg: "bg-amber-50 dark:bg-amber-900/30",
            text: "text-amber-600 dark:text-amber-400"
        },
        red: {
            bg: "bg-red-50 dark:bg-red-900/30",
            text: "text-red-600 dark:text-red-400"
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 ${colorClasses[color].bg} rounded-full`}>
                        <Icon className={`w-5 h-5 ${colorClasses[color].text}`} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                        <h4 className="text-xl font-bold">{formatter ? formatter(value) : value || '0'}</h4>
                    </div>
                </div>
                {indicator && indicator(value)}
            </div>
        </div>
    );
};

// Stream table component with TypeScript
const StreamTable: React.FC<StreamTableProps> = ({ streams, deleteStream, isDashboard }) => (
    <div className="overflow-x-auto rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>SR No.</TableHead>
                    <TableHead>Stream Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Eligibility</TableHead>
                    {!isDashboard && <TableHead className="text-center">Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {streams.map((stream, index) => (
                    <TableRow key={stream._id}>
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell className="font-medium">{capitalize(stream.streamName)}</TableCell>
                        <TableCell className="capitalize">{stream.streamType}</TableCell>
                        <TableCell>{stream.duration} Years</TableCell>
                        <TableCell>
                            <div className="text-sm space-y-1">
                                <div>12th: {stream.eligibilityCriteria.minTwelfthPercentage}%</div>
                                <div>
                                    Exams: {stream.eligibilityCriteria.requiredExams.join(', ').toUpperCase()}
                                </div>
                            </div>
                        </TableCell>
                        {!isDashboard &&
                        <TableCell>
                            <div className="flex items-center justify-center gap-2">
                                <AddCourse 
                                    streamId={stream._id} 
                                    streamName={capitalize(stream.streamName)} 
                                    examName={stream.eligibilityCriteria.requiredExams.join(', ')}
                                />
                                <AddStreamDialog isEdit={true} stream={stream} />
                                <ReusableAlertDialog
                                    triggerLabel={<Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />}
                                    title="Delete Stream"
                                    description={`Are you sure you want to delete ${stream.streamName}? This action cannot be undone.`}
                                    onConfirm={() => deleteStream(stream._id)}
                                />
                            </div>
                        </TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);

// Course list component with TypeScript
const CourseList: React.FC<CourseListProps> = ({ streams, deleteCourse, isDashboard }) => (
    <div className="space-y-6">
        {streams.map((stream) => (
            <Card key={stream._id} className="border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            {capitalize(stream.streamName)} Courses
                        </CardTitle>
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            {stream.streamType}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {stream.courses && stream.courses.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Course Name</TableHead>
                                       {!isDashboard && <TableHead className="text-right">Actions</TableHead>}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stream.courses.map((course) => (
                                        <TableRow key={course._id}>
                                            <TableCell className="font-medium">{course.branches}</TableCell>
                                          {!isDashboard &&  <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <AddCourse 
                                                        streamId={stream._id} 
                                                        streamName={stream.streamName}
                                                        examName={stream.eligibilityCriteria.requiredExams.join(', ')}
                                                        edit={true}
                                                        courseId={course._id}
                                                        minimumEntranceScore={course.minimumEntranceScore}
                                                        seat={course.seats} 
                                                    />
                                                    <ReusableAlertDialog
                                                        triggerLabel={<Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />}
                                                        title="Delete Course"
                                                        description={`Are you sure you want to delete ${course.branches}?`}
                                                        onConfirm={() => deleteCourse(course._id)}
                                                    />
                                                </div>
                                            </TableCell>}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-muted-foreground">
                            No courses available for this stream
                        </div>
                    )}
                </CardContent>
            </Card>
        ))}
    </div>
);

const CollegeInfoCard: React.FC = () => {
    const college = useAppSelector((state) => state.collegeInfo) as CollegeInfo | null;
     
    const dispatch = useAppDispatch();
    const isDashboard = (!useLocation().pathname.includes('profile'));

    // Loading state
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

    // API data fetching
    const { data: streams } = useFetch<string[]>(getConstantStreamDataService, college?.typeOfCollege);
    const { data: exams } = useFetch<string[]>(getConstantEntranceExamDataService, college?.typeOfCollege);
    const { data: courseStream } = useFetch(getConstantDataService, college?.typeOfCollege);

    // Event handlers
    const deleteCourse = async (courseId: string): Promise<void> => {
        try {
            await deleteCourseOfStreamService(courseId);
            dispatch(deleteCourseById({ courseId }));
            toast.success('Course deleted successfully');
        } catch (error) {
            toast.error('Error deleting course');
            console.error('Error:', error);
        }
    };

    const deleteStream = async (streamId: string): Promise<void> => {
        try {
            await deleteStreamByIdService(streamId);
            dispatch(deleteStreamById({ streamId }));
            toast.success('Stream deleted successfully');
        } catch (error) {
            toast.error('Error deleting stream');
            console.error('Error:', error);
        }
    };

    // Render progress indicator for metrics - fixed color handling for Tailwind
    const renderProgressIndicator = (value: number | undefined, colorName: string = "blue"): React.ReactNode => {
        const colorClasses = {
            "blue": {
                border: "border-blue-100 dark:border-blue-900",
                bg: "bg-blue-500 dark:bg-blue-600"
            },
            "purple": {
                border: "border-purple-100 dark:border-purple-900",
                bg: "bg-purple-500 dark:bg-purple-600"
            },
            "green": {
                border: "border-green-100 dark:border-green-900",
                bg: "bg-green-500 dark:bg-green-600"
            },
            "amber": {
                border: "border-amber-100 dark:border-amber-900",
                bg: "bg-amber-500 dark:bg-amber-600"
            }
        };
        
        const colorConfig = colorClasses[colorName] || colorClasses.blue;
        
        return (
            <div className="h-12 w-12">
                <div className={`relative h-full w-full rounded-full border-4 ${colorConfig.border}`}>
                    <div
                        className={`absolute inset-0.5 rounded-full ${colorConfig.bg}`}
                        style={{
                            clipPath: `polygon(0 0, 100% 0, 100% ${Math.min(100, ((value || 0) * 10))}%, 0 ${Math.min(100, ((value || 0) * 10))}%)`
                        }}
                    ></div>
                </div>
            </div>
        );
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-primary/10 rounded-xl flex items-center justify-center">
                        {college.logo?.url ? (
                            <img src={college.logo.url} alt="College Logo" className="w-16 h-16 rounded-full" />
                        ) : (
                            <School className="w-12 h-12 text-primary" />
                        )}
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{college.collegeName}</CardTitle>
                        <p className="text-muted-foreground mt-1">{college.university}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* College Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary" />
                            <span>{capitalize(college?.type || '')} ({capitalize(college?.typeOfCollege?.join(',') || '')})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>
                                {capitalize(college.address?.city || '')}, {capitalize(college.address?.state || '')}, {capitalize(college.address?.country || '')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-primary" />
                            <span>NIRF Ranking: {college.rankingNIRF || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary" />
                            <a
                                href={college.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                {college.website || 'Website not available'}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            <span>{college.email || 'Email not available'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-primary" />
                            <span>{college.contactNumber || 'Contact not available'}</span>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard 
                            icon={BookOpen} 
                            title="Research Score" 
                            value={college.researchScore}
                            color="blue" 
                            indicator={(value) => renderProgressIndicator(value, "blue")}
                        />
                        <MetricCard 
                            icon={Eye} 
                            title="Perception Score" 
                            value={college.perceptionScore}
                            color="purple" 
                            indicator={(value) => renderProgressIndicator(value, "purple")}
                        />
                        <MetricCard 
                            icon={GraduationCap} 
                            title="Graduation Outcome" 
                            value={college.graducationOutcome}
                            color="green" 
                            indicator={(value) => renderProgressIndicator(value, "green")}
                        />
                        <MetricCard 
                            icon={Users} 
                            title="Teacher-Learner Ratio" 
                            value={college.teacherLeanerRatio}
                            color="amber"
                            formatter={(value) => `${value || '0'}`}
                            indicator={(value) => (
                                <div className="h-12 w-12 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-amber-500 dark:text-amber-400">
                                        {value ? (value <= 15 ? '👍' : '👌') : '—'}
                                    </span>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <Separator />

                {/* Streams Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            Available Streams
                        </h2>
                        {!isDashboard && (
                            <AddStreamDialog 
                                streams={streams || []} 
                                exams={exams || []} 
                            />
                        )}
                    </div>

                    {college.streams && college.streams.length > 0 ? (
                        <StreamTable streams={college.streams} deleteStream={deleteStream} isDashboard={isDashboard} />
                    ) : (
                        <div className="text-center py-8 bg-muted/50 rounded-lg border border-dashed">
                            <School className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">No streams added yet.</p>
                            {!isDashboard && (
                                <AddStreamDialog
                                    streams={streams || []}
                                    exams={exams || []}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    <Button variant="outline" className="mt-3">
                                        <PlusCircle className="w-4 h-4 mr-2" />
                                        Add your first stream
                                    </Button>
                                </AddStreamDialog>
                            )}
                        </div>
                    )}
                </div>

                {/* Courses Section */}
                {college.streams && college.streams.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Available Courses
                            </h2>
                        </div>
                        
                        <CourseList streams={college.streams} deleteCourse={deleteCourse} isDashboard={isDashboard} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CollegeInfoCard;