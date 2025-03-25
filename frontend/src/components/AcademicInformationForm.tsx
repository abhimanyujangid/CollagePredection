import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IStudentEducation, IStudentEducationSchema } from "@/ZODtypes/profile";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/hooks/reduxHook";
import { indianStates, twelfthStreams } from "@/constant/Dummydata";
import CoustomDropdown from "./CoustomDropdown";
import CustomDropdown from "./CoustomDropdown";

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
      competitiveExams: {
        examName: "",
        score: 0,
        yearOfPassing: 0,
        rank: 0,
      }
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
                [
                  { label: "School Name", name: "tenth.schoolName", type: "text" },
                  { label: "Board", name: "tenth.board", type: "text" },
                  { label: "Percentage", name: "tenth.percentage", type: "number" },
                  { label: "Year of Passing", name: "tenth.yearOfPassing", type: "number" },
                ].map(({ label, name, type }: { label: string, name: string, type: string }) => (
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
                [
                  { label: "School Name", name: "twelfth.schoolName", type: "text" },
                  { label: "Board", name: "twelfth.board", type: "text" },
                  { label: "Percentage %", name: "twelfth.percentage", type: "number" },
                  { label: "Year of Passing", name: "twelfth.yearOfPassing", type: "number" },
                ].map(({ label, name, type }: { label: string, name: string, type: string }) => (
                  <div className="mb-4" key={name}>
                    <Label >{label}</Label>
                    <Input id={name as keyof IStudentEducation} type={type} {...register(name as keyof IStudentEducation)} />
                  </div>
                ))
              }
              {[
                {
                  label: "Stream",
                  placeholder: "Select a stream",
                  name: "twelfth.stream",
                  data: twelfthStreams.map((stream) => stream.name),
                },
                {
                  label: "State",
                  placeholder: "Select a state",
                  name: "twelfth.state",
                  data: indianStates.map((state) => state.name),
                },
              ].map(({ label, placeholder, name, data }) => (
                <div className="mb-4" key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <CoustomDropdown control={control} data={data} placeholder={placeholder} name={name} />
                </div>
              ))}
<div >
  <Button>Submit</Button>
</div>
            </section>
            </div>
        </CardContent>
      </Card>
    </form>
  );
}
