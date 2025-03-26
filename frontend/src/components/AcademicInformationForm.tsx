import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IStudentEducation, IStudentEducationSchema } from "@/ZODtypes/profile";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/hooks/reduxHook";
import { indianStates, twelfthStreams } from "@/constant/Dummydata";
import CoustomDropdown from "./CoustomDropdown";
import { tenthLabel, twelfthLabel } from "@/constant/inputLabel";
import { twelfthDropDownData } from "@/constant/dropDownData";
import { useState, useEffect } from "react";

interface IAcademicInformationProps {
  data: {
    studentEducation: IStudentEducation | null,
    loading: boolean
  }
}

export default function AcademicInformationForm({ data }: IAcademicInformationProps) {
  const { studentEducation, loading } = data;
  const dispatch = useAppDispatch();

  // Initialize state for dynamic fields
  const [subjectMarks, setSubjectMarks] = useState<IStudentEducation["twelfth"]["subjectsWithMarks"]>([]);
  const [competitiveExams, setCompetitiveExams] = useState<IStudentEducation["competitiveExams"]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IStudentEducation>({
    resolver: zodResolver(IStudentEducationSchema),
    defaultValues: {
      tenth: {
        schoolName: "",
        board: "",
        state: "",
        percentage: 0,
        yearOfPassing: 0,
      },
      twelfth: {
        schoolName: "",
        stream: "",
        subjectsWithMarks: [],
        board: "",
        state: "",
        percentage: 0,
        yearOfPassing: 0,
      },
      competitiveExams: []
    },
  });

  console.log(errors);

  // Effect to pre-fill form with existing data
  useEffect(() => {
    if (studentEducation) {
      // Reset form with existing data
      reset(studentEducation);

      // Set dynamic fields for subjects and competitive exams
      if (studentEducation.twelfth?.subjectsWithMarks) {
        setSubjectMarks(studentEducation.twelfth.subjectsWithMarks);
      }

      if (studentEducation.competitiveExams) {
        setCompetitiveExams(studentEducation.competitiveExams);
      }
    }
  }, [studentEducation, reset]);

  const addSubjectMarks = () => {
    setSubjectMarks((prev) => [
      ...prev,
      { subject: "", maxMarks: 0, obtainedMarks: 0 }
    ]);
  };

  const removeStudentMark = (index: number) => {
    setSubjectMarks((prev) => prev.filter((_, i) => i !== index));
  };

  const addCompetitiveExam = () => {
    setCompetitiveExams((prev) => [
      ...prev,
      { examName: "", yearOfPassing: 0, score: 0, rank: 0 }
    ]);
  };

  const removeCompetitiveExam = (index: number) => {
    setCompetitiveExams((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (formData: IStudentEducation) => {
    // Add your submit logic here
    console.log("Form submitted:", formData);
    // Dispatch action to save data if needed
    // dispatch(saveStudentEducation(formData));
  };
 
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
          <p className="text-sm text-muted-foreground">Please provide your academic details.</p>
        </CardHeader>
        <CardContent>
          {/* 10th Details */}
          <div>
            <Label>Class 10th Details</Label>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
              {
                tenthLabel.map(({ label, name, type }: { label: string, name: string, type: string }) => (
                  <div className="mb-4" key={name}>
                    <Label>{label}</Label>
                    <Input 
                      id={name} 
                      type={type} 
                      {...register(`tenth.${name}` as const)} 
                    />
                    {errors.tenth?.[name as keyof typeof errors.tenth] && (
                      <p className="text-red-500 text-sm">
                        {errors.tenth?.[name as keyof typeof errors.tenth]?.message}
                      </p>
                    )}
                  </div>
                ))
              }
              <div className="mb-4">
                <Label htmlFor="tenthState">State</Label>
                <CoustomDropdown 
                  control={control} 
                  data={indianStates.map((state) => state.name)} 
                  placeholder="Select a state" 
                  name="tenth.state" 
                />
              </div>
            </section>
          </div>

          {/* 12th Details */}
          <div>
            <Label>Class 12th Details</Label>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4 w-full">
              {
                twelfthLabel.map(({ label, name, type }: { label: string, name: string, type: string }) => (
                  <div className="mb-4" key={name}>
                    <Label>{label}</Label>
                    <Input 
                      id={name} 
                      type={type} 
                      {...register(`twelfth.${name}` as const)} 
                    />
                    {errors.twelfth?.[name as keyof typeof errors.twelfth] && (
                      <p className="text-red-500 text-sm">
                        {errors.twelfth?.[name as keyof typeof errors.twelfth]?.message}
                      </p>
                    )}
                  </div>
                ))
              }
              {/* Dropdown Fields */}
              {twelfthDropDownData.map(({ label, placeholder, name, data }) => (
                <div className="mb-4" key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <CoustomDropdown 
                    control={control} 
                    data={data} 
                    placeholder={placeholder} 
                    name={`twelfth.${name}`} 
                  />
                </div>
              ))}
            </section>

              {/* Subject Marks */}
              <div className="mb-4 flex flex-col">
                <Label>Subject with Marks</Label>
                {subjectMarks.map((_, index) => (
                  <div key={index} className="flex gap-4 items-center w-full my-2">
                    <div>
                      <Label>Subject</Label>
                      <Input 
                        placeholder="Subject" 
                        {...register(`twelfth.subjectsWithMarks.${index}.subject`)} 
                      />
                    </div>
                    <div>
                      <Label>Max Marks</Label>
                      <Input 
                        placeholder="Max marks" 
                        type="number" 
                        {...register(`twelfth.subjectsWithMarks.${index}.maxMarks`)} 
                      />
                    </div>
                    <div>
                      <Label>Obtained Marks</Label>
                      <Input 
                        placeholder="Obtained marks" 
                        type="number" 
                        {...register(`twelfth.subjectsWithMarks.${index}.obtainedMarks`)} 
                      />
                    </div>
                    <Button 
                      type="button" 
                      onClick={() => removeStudentMark(index)} 
                      variant="ghost" 
                      className="self-end"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  onClick={addSubjectMarks} 
                  className="w-1/4 mt-3"
                >
                  Add Subject
                </Button>
              </div>
          </div>

          {/* Competitive Exams */}
          <div className="mb-4 flex flex-col">
            <Label>Competitive Exams</Label>
            {competitiveExams.map((_, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 my-2 items-center">
                <div>
                  <Label>Exam Name</Label>
                  <Input 
                    placeholder="Exam Name" 
                    {...register(`competitiveExams.${index}.examName`)} 
                  />
                </div>
                <div>
                  <Label>Year of Passing</Label>
                  <Input 
                    placeholder="Year of Passing" 
                    type="number" 
                    {...register(`competitiveExams.${index}.yearOfPassing`)} 
                  />
                </div>
                <div>
                  <Label>Score</Label>
                  <Input 
                    placeholder="Score" 
                    type="number" 
                    {...register(`competitiveExams.${index}.score`)} 
                  />
                </div>
                <div>
                  <Label>Rank</Label>
                  <Input 
                    placeholder="Rank" 
                    type="number" 
                    {...register(`competitiveExams.${index}.rank`)} 
                  />
                </div>
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    onClick={() => removeCompetitiveExam(index)} 
                    variant="ghost"
                  >
                    X
                  </Button>
                </div>
              </div>
            ))}
            <Button 
              type="button" 
              onClick={addCompetitiveExam} 
              className="w-1/4 mt-3"
            >
              Add Exam
            </Button>
          </div>

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}