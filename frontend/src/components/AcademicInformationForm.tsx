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
import { useState } from "react";

interface IAcademicInformationProps {
  data: {
    studentEducation: IStudentEducation | null,
    loading: boolean
  }
}

export default function AcademicInformationForm(data: IAcademicInformationProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
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
      competitiveExams: [{
        examName: "",
        yearOfPassing: 0,
        score: 0,
        rank: 0,
      }]
    },
  });


  return (
    <form action="">
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
          <p className="text-sm text-muted-foreground">Please provide your academic details.</p>
        </CardHeader>
        <CardContent>
          {/* For 10th  Details */}
          <div>
            <Label >Class 10th Details</Label>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  p-4">
              {
                tenthLabel.map(({ label, name, type }: { label: string, name: string, type: string }) => (
                  <div className="mb-4" key={name}>
                    <Label >{label}</Label>
                    <Input id={name} type={type} {...register(name)} />
                    {errors[name as keyof IStudentEducation] && <p className="text-red-500 text-sm">{errors[name as keyof IStudentEducation]?.message}</p>}
                  </div>
                ))
              }
              <div className="mb-4">
                <Label htmlFor="tenthState">State</Label>
                <CoustomDropdown control={control} data={indianStates.map((state) => state.name)} placeholder="Select a state" name="tenth.state" />
              </div>
            </section>
          </div>

          {/* // For 12th Details */}
          <div>
            <Label >Class 12th Details</Label>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  p-4">
              {
                twelfthLabel.map(({ label, name, type }: { label: string, name: string, type: string }) => (
                  <div className="mb-4" key={name}>
                    <Label >{label}</Label>
                    <Input id={name as keyof IStudentEducation} type={type} {...register(name as keyof IStudentEducation)} />
                  </div>
                ))
              }
              {/* For DropDown */}
              {twelfthDropDownData.map(({ label, placeholder, name, data }) => (
                <div className="mb-4" key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <CoustomDropdown control={control} data={data} placeholder={placeholder} name={name} />
                </div>
              ))}

              {/* For Subject marks */}
              <div className="col-span-2">
                <Label>Subject with Marks</Label>
                <div className="flex gap-2">
                  <Input placeholder="Subject Name" />
                  <Input placeholder="Max marks" type="number" />
                  <Input placeholder="Obtained marks" type="number" />
                  <Button type="button" >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {/* Todo: add badge in this show Subject anem and macx and obtain marks  */}
                </div>
              </div>
              
            </section>
          </div>

          {/* For Competitive Exams */}
          <div>
            <Label>Competitive Exams</Label>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
              <div className="mb-4">
                <Label>Exam Name</Label>
                <Input placeholder="Exam Name" {...register("currentExam.examName")} />
              </div>
              <div className="mb-4">
                <Label>Year of Passing</Label>
                <Input placeholder="Year of Passing" type="number" {...register("currentExam.yearOfPassing")} />
              </div>
              <div className="mb-4">
                <Label>Score</Label>
                <Input placeholder="Score" type="number" {...register("currentExam.score")} />
              </div>
              <div className="mb-4">
                <Label>Rank</Label>
                <Input placeholder="Rank" type="number" {...register("currentExam.rank")} />
              </div>
              <div className="mb-4 col-span-4">
                <Button type="button" onClick={''}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 col-span-4">
                {/* {competitiveExams.map((exam, index) => (
                  <Badge key={index} className="p-2 border bg-white shadow-sm">
                    <p>{`Exam: ${exam.examName}, Year: ${exam.yearOfPassing}, Score: ${exam.score}, Rank: ${exam.rank}`}</p>
                  </Badge>
                ))} */}
              </div>
            </section>
          </div>

          <div >
                <Button>Submit</Button>
              </div>
        </CardContent>
      </Card>
    </form>
  );
}
