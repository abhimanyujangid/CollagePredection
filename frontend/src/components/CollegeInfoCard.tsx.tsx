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

type Props = {
    data: any;
};

const CollegeInfoCard: React.FC<Props> = ({ data }) => {
    if (!data) {
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

    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center">
                        {data.logo?.url ? (
                            <img src={data.logo?.url} alt="College Logo" className="w-16 h-16 rounded-full" />
                        ) : (
                            <School className="w-12 h-12 text-primary" />
                        )}
                    </div>
                    <div>
                        <CardTitle>{data.collegeName}</CardTitle>
                        <p className="text-muted-foreground">{data.university}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            <span>{data.type.charAt(0).toUpperCase() + data.type.slice(1)} ({data.typeOfCollege.charAt(0).toUpperCase() + data.typeOfCollege.slice(1)})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span>
                                {capitalize(data.address?.city)}, {capitalize(data.address?.state)}, {capitalize(data.address?.country)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5" />
                            <span>NIRF Ranking: {data.rankingNIRF}</span>
                        </div>
                    </div>
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            <a
                                href={data.website || 'https://home.iitd.ac.in/'}
                                className="text-primary hover:underline"
                            >
                                {data.website || 'https://home.iitd.ac.in/'}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            <span>{data.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            <span>{data.contactNumber}</span>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                        Available Streams
                    </h2>
                   <AddStreamDialog/>
                </div>

                {data?.streams.length > 0 ? (
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

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.streams.map((stream:Stream, index:number) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}.</TableCell>
                                        <TableCell>{stream.streamName}</TableCell>
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
                                            <AddCourse streamId={stream._id} streamName={stream.streamName} examName={stream.eligibilityCriteria.requiredExams.join(', ')} />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
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
            </CardContent>
        </Card>
    );
};

export default CollegeInfoCard;
