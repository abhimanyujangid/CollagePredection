import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IStudent, IStudentSchema } from "@/ZODtypes/profile";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { studentProfileAction, updateStudentProfileAction } from "@/store/auth/studentSlice";
import CustomDropdown from "./CoustomDropdown";
import { cast, gender } from "@/constant/Dummydata";

interface IStudentProps {
  data: {
    student: IStudent | null;
    loading: boolean;
  };
}

export default function PersonalInformationForm({ data }: IStudentProps) {
  const { student, loading } = data;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IStudent>({
    resolver: zodResolver(IStudentSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: undefined,
      cast: undefined,
      hobbies: [],
    },
  });

  const [hobbies, setHobbies] = useState<string[]>(student?.hobbies || []);
  const hobbyInput = watch("hobbies");

  useEffect(() => {
    if (student) {
      setValue("fullName", student.fullName || "");
      setValue("phoneNumber", student.phoneNumber || "");
      setValue("dateOfBirth", student.dateOfBirth ? student.dateOfBirth.split("T")[0] : "");
      setValue("gender", student.gender || "");
      setValue("cast", student.cast || "");
      setHobbies(student.hobbies || []);
    }
  }, [student, setValue]);

  const addHobby = () => {
    if (hobbyInput && !hobbies.includes(hobbyInput)) {
      setHobbies([...hobbies, hobbyInput]);
      setValue("hobbies", ""); // Clear input after adding
    }
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter((h) => h !== hobby));
  };

  const onSubmit = (data: IStudent) => {
    data.hobbies = hobbies;
    const id = student?._id || "";
    if (student) {
      dispatch(updateStudentProfileAction({ data, id }));
    } else {
      dispatch(studentProfileAction({ data }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <p className="text-sm text-muted-foreground">Update your personal details and preferences.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {["fullName", "phoneNumber", "dateOfBirth"].map((field) => (
            <div key={field}>
              <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input {...register(field)} placeholder={field === "dateOfBirth" ? "YYYY-MM-DD" : ""} type={field === "dateOfBirth" ? "date" : "tel"}  loading={loading} />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]?.message as string}</p>}
            </div>
          ))}
          {["gender", "cast"].map((field) => (
            <div key={field}>
              <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <CustomDropdown
                control={control}
                loading={loading}
                data={field === "gender" ? gender : cast}
                placeholder={`Select a ${field}`}
                name={field}
                upperCase={field === "cast"}
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]?.message as string}</p>}
            </div>
          ))}
          <div className="col-span-2">
            <Label>Hobbies</Label>
            <div className="flex gap-2">
              <Input {...register("hobbies")} placeholder="Enter hobby" disabled={loading} />
              <Button type="button" onClick={addHobby} disabled={loading}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {hobbies.map((hobby) => (
                <Badge key={hobby} className="cursor-pointer" onClick={() => removeHobby(hobby)}>
                  {hobby} ✕
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <div className="p-4 flex justify-end">
          <Button type="submit">{
            loading ? "Loading..." : student ? "Update" : "Create"
          }</Button>
        </div>
      </Card>
    </form>
  );
}
