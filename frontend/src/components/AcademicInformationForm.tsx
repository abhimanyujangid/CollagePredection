import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { EXAM_OPTIONS, INDIAN_STATE, STATE_BOARD, TWELFTH_STREAM } from "@/constant/dropDownData";
import CustomDropdown from "./CoustomDropdown";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createEducationDetailsService } from "@/services/apis";
import { useAppDispatch } from "@/hooks/reduxHook";
import { studentEducationAction, updateEducationDetailsAction } from "@/store/auth/studentSlice";



// Improved schema with more specific validations
const subjectSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  maxMarks: z.string()
    .min(1, "Max marks required")
    .regex(/^\d+$/, "Must be a valid number")
    .refine((val) => parseInt(val) > 0, "Must be greater than 0"),
  obtainedMarks: z.string()
    .min(1, "Obtained marks required")
    .regex(/^\d+$/, "Must be a valid number")
    .refine((val) => parseInt(val) >= 0, "Must be 0 or greater"),
});

// Schema for competitive exams
const examSchema = z.object({
  examName: z.string().min(1, "Exam name is required"),
  score: z.string()
    .min(1, "Score is required")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
  yearOfPassing: z.string()
    .min(1, "Year is required")
    .regex(/^\d{4}$/, "Enter a valid 4-digit year")
    .refine((val) => {
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 1980 && year <= currentYear;
    }, "Enter a valid year between 1980 and current year"),
  rank: z.string()
    .min(1, "Rank is required")
    .regex(/^\d+$/, "Must be a valid number")
    .refine((val) => parseInt(val) > 0, "Rank must be greater than 0"),
});

const academicSchema = z.object({
  twelfth: z.object({
    board: z.string().min(1, "Board is required"),
    percentage: z.string()
      .min(1, "Percentage is required")
      .regex(/^\d{1,3}(\.\d{1,2})?$/, "Enter a valid percentage")
      .refine((val) => parseFloat(val) >= 0 && parseFloat(val) <= 100, 
        "Percentage must be between 0 and 100"),
    yearOfPassing: z.string()
      .min(1, "Year is required")
      .regex(/^\d{4}$/, "Enter a valid 4-digit year")
      .refine((val) => {
        const year = parseInt(val);
        const currentYear = new Date().getFullYear();
        return year >= 1980 && year <= currentYear;
      }, "Enter a valid year between 1980 and current year"),
    stream: z.string().min(1, "Stream is required"),
    subjectsWithMarks: z.array(subjectSchema).min(1, "At least one subject is required"),
  }),
  competitiveExams: z.array(examSchema).optional(),
});

type AcademicFormData = z.infer<typeof academicSchema>;
type SubjectWithMarks = z.infer<typeof subjectSchema>;
type CompetitiveExam = z.infer<typeof examSchema>;

interface AcademicInformationFormProps {
  data: {
    studentEducation: AcademicFormData | null;
    loading: boolean;
  };
}

const AcademicInformationForm: React.FC<AcademicInformationFormProps> = ({
  data,
}) => {
  const { studentEducation, loading } = data;
  console.log("Student Education Data:", studentEducation);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectDialogOpen, setSubjectDialogOpen] = useState(false);
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState<SubjectWithMarks>({
    subject: '',
    maxMarks: '',
    obtainedMarks: ''
  });
  const [newExam, setNewExam] = useState<CompetitiveExam>({
    examName: '',
    score: '',
    yearOfPassing: '',
    rank: ''
  });
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [examError, setExamError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AcademicFormData>({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      twelfth: {
        board: "",
        percentage: "",
        yearOfPassing: "",
        stream: "",
        subjectsWithMarks: [],
      },
      competitiveExams: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "twelfth.subjectsWithMarks",
  });

  const { 
    fields: examFields, 
    append: appendExam, 
    remove: removeExam 
  } = useFieldArray({
    control,
    name: "competitiveExams",
  });

  const currentSubjects = watch("twelfth.subjectsWithMarks");
  const currentExams = watch("competitiveExams");

  useEffect(() => {
    if (studentEducation) {
      reset(studentEducation);
    }
  }, [studentEducation, reset]);

  const handleAddSubject = () => {
    try {
      // Validate new subject
      const parsedSubject = subjectSchema.parse(newSubject);
      
      // Check if obtained marks <= max marks
      if (parseInt(parsedSubject.obtainedMarks) > parseInt(parsedSubject.maxMarks)) {
        setSubjectError("Obtained marks cannot exceed maximum marks");
        return;
      }

      // Check if subject already exists
      const exists = currentSubjects?.some(
        (s) => s.subject.toLowerCase() === parsedSubject.subject.toLowerCase()
      );

      if (exists) {
        setSubjectError("This subject is already added");
        return;
      }

      // Add subject to form
      append(parsedSubject);
      setNewSubject({ subject: '', maxMarks: '', obtainedMarks: '' });
      setSubjectError(null);
      setSubjectDialogOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        setSubjectError(firstError.message);
      } else {
        setSubjectError("Invalid input");
      }
    }
  };

  const handleAddExam = () => {
    try {
      // Validate new exam
      const parsedExam = examSchema.parse(newExam);
      
      // Check if exam already exists
      const exists = currentExams?.some(
        (e) => e.examName.toLowerCase() === parsedExam.examName.toLowerCase()
      );

      if (exists) {
        setExamError("This exam is already added");
        return;
      }

      // Add exam to form
      appendExam(parsedExam);
      setNewExam({ examName: '', score: '', yearOfPassing: '', rank: '' });
      setExamError(null);
      setExamDialogOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        setExamError(firstError.message);
      } else {
        setExamError("Invalid input");
      }
    }
  };

  const onSubmit = async (data: AcademicFormData) => {
    try {
      setIsSubmitting(true);
      if (studentEducation) {
     
        dispatch(updateEducationDetailsAction(data));
      } else {
        // API call to create data would go here
         dispatch(studentEducationAction({data}));
      }
      // Show success message
    } catch (error) {
      console.error("Error saving academic information:", error);
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePercentage = (subject: SubjectWithMarks) => {
    const max = parseInt(subject.maxMarks);
    const obtained = parseInt(subject.obtainedMarks);
    if (max > 0) {
      return ((obtained / max) * 100).toFixed(2) + '%';
    }
    return '0%';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin h-6 w-6" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>Academic Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your academic details and preferences.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Class 12 */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Class 12th Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CustomDropdown
                  control={control}
                  loading={loading}
                  data={STATE_BOARD}
                  placeholder="Select a Board"
                  name="twelfth.board"
                />
                {errors.twelfth?.board && (
                  <p className="text-red-500 text-sm mt-1">{errors.twelfth.board.message}</p>
                )}
              </div>
              <div>
                <Input 
                  {...register("twelfth.percentage")} 
                  placeholder="Percentage (0-100)"
                  type="text"
                />
                {errors.twelfth?.percentage && (
                  <p className="text-red-500 text-sm mt-1">{errors.twelfth.percentage.message}</p>
                )}
              </div>
              <div>
                <Input 
                  {...register("twelfth.yearOfPassing")} 
                  placeholder="Year of Passing (YYYY)"
                  maxLength={4}
                />
                {errors.twelfth?.yearOfPassing && (
                  <p className="text-red-500 text-sm mt-1">{errors.twelfth.yearOfPassing.message}</p>
                )}
              </div>
              <div>
                <CustomDropdown
                  control={control}
                  loading={loading}
                  data={TWELFTH_STREAM}
                  placeholder="Select a Stream"
                  name="twelfth.stream"
                />
                {errors.twelfth?.stream && (
                  <p className="text-red-500 text-sm mt-1">{errors.twelfth.stream.message}</p>
                )}
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium">Subject-wise Marks</h3>
                <Dialog open={subjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Subject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Subject Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject Name</Label>
                        <Input 
                          id="subject" 
                          value={newSubject.subject}
                          onChange={(e) => setNewSubject({...newSubject, subject: e.target.value})}
                          placeholder="e.g. Mathematics"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="maxMarks">Maximum Marks</Label>
                          <Input 
                            id="maxMarks" 
                            value={newSubject.maxMarks}
                            onChange={(e) => setNewSubject({...newSubject, maxMarks: e.target.value})}
                            placeholder="e.g. 100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="obtainedMarks">Obtained Marks</Label>
                          <Input 
                            id="obtainedMarks" 
                            value={newSubject.obtainedMarks}
                            onChange={(e) => setNewSubject({...newSubject, obtainedMarks: e.target.value})}
                            placeholder="e.g. 85"
                          />
                        </div>
                      </div>
                      {subjectError && (
                        <p className="text-red-500 text-sm">{subjectError}</p>
                      )}
                      <Button type="button" onClick={handleAddSubject} className="w-full">
                        Add Subject
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {fields.length > 0 ? (
                <ScrollArea className="h-[150px] rounded-md border p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {fields.map((field, index) => (
                      <Badge key={field.id} variant="outline" className="pl-3 pr-2 py-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">
                            {watch(`twelfth.subjectsWithMarks.${index}.subject`)}
                          </span>
                          <span className="text-xs">
                            ({watch(`twelfth.subjectsWithMarks.${index}.obtainedMarks`)}/
                            {watch(`twelfth.subjectsWithMarks.${index}.maxMarks`)} - 
                            {calculatePercentage(watch(`twelfth.subjectsWithMarks.${index}`))}
                            )
                          </span>
                          <button 
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-[100px] border rounded-md bg-muted/20">
                  <p className="text-sm text-muted-foreground">No subjects added. Add subjects using the button above.</p>
                </div>
              )}
              
              {errors.twelfth?.subjectsWithMarks && (
                <p className="text-red-500 text-sm mt-2">{errors.twelfth.subjectsWithMarks.message}</p>
              )}
            </div>
          </div>

          {/* Competitive Exams */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Competitive Exams</h2>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium">Exam Details</h3>
                <Dialog open={examDialogOpen} onOpenChange={setExamDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Exam
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Competitive Exam Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="examName">Exam Name</Label>
                        <Select 
                          onValueChange={(value) => setNewExam({...newExam, examName: value})}
                          value={newExam.examName}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an exam" />
                          </SelectTrigger>
                          <SelectContent>
                            {EXAM_OPTIONS.map((exam) => (
                              <SelectItem key={exam} value={exam}>
                                {exam}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="score">Score</Label>
                        <Input 
                          id="score" 
                          value={newExam.score}
                          onChange={(e) => setNewExam({...newExam, score: e.target.value})}
                          placeholder="e.g. 250"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="examYear">Year of Passing</Label>
                        <Input 
                          id="examYear" 
                          value={newExam.yearOfPassing}
                          onChange={(e) => setNewExam({...newExam, yearOfPassing: e.target.value})}
                          placeholder="e.g. 2023"
                          maxLength={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rank">Rank</Label>
                        <Input 
                          id="rank" 
                          value={newExam.rank}
                          onChange={(e) => setNewExam({...newExam, rank: e.target.value})}
                          placeholder="e.g. 1500"
                        />
                      </div>
                      {examError && (
                        <p className="text-red-500 text-sm">{examError}</p>
                      )}
                      <Button type="button" onClick={handleAddExam} className="w-full">
                        Add Exam
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {examFields.length > 0 ? (
                <ScrollArea className="h-[150px] rounded-md border p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {examFields.map((field, index) => (
                      <Badge key={field.id} variant="outline" className="pl-3 pr-2 py-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">
                            {watch(`competitiveExams.${index}.examName`)}
                          </span>
                          <span className="text-xs">
                            (Score: {watch(`competitiveExams.${index}.score`)},  
                            Rank: {watch(`competitiveExams.${index}.rank`)}, 
                            Year: {watch(`competitiveExams.${index}.yearOfPassing`)})
                          </span>
                          <button 
                            type="button"
                            onClick={() => removeExam(index)}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-[100px] border rounded-md bg-muted/20">
                  <p className="text-sm text-muted-foreground">No competitive exams added. Add exams using the button above.</p>
                </div>
              )}
              
              {errors.competitiveExams && (
                <p className="text-red-500 text-sm mt-2">Please check exam details</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : studentEducation ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AcademicInformationForm;