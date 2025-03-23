import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IStudent } from "@/types/profile";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { studentProfileAction, updateStudentProfileAction } from "@/store/auth/studentSlice";

const studentSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["male", "female", "other"], { message: "Select a valid gender" }),
  cast: z.enum(["general", "obc", "sc", "st", "ews"], { message: "Select a valid cast" }),
});

interface IStudentProps {
  data: {
    student: IStudent | null;
    loading: boolean;
  };
}

export default function PersonalInformationForm({ data }: IStudentProps) {
  const { student, loading} = data;
  const dispatch = useAppDispatch();
  // _id: new ObjectId('67df9c3805a57087c3adf4bc'),
  // userId: new ObjectId('67dcdff5bf35deb933ff6747'),
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IStudent>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      cast: "",
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
          <div className="col-span-2">
            <Label>Full Name</Label>
            <Input {...register("fullName")} placeholder="John Smith" disabled={loading}/>
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input {...register("phoneNumber")} placeholder="1234567890" disabled={loading}/>
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input {...register("dateOfBirth")} type="date" disabled={loading}/>
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
          </div>
          <div>
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {["male", "female", "other"].map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
          <div>
            <Label>Cast</Label>
            <Controller
              name="cast"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cast" />
                  </SelectTrigger>
                  <SelectContent>
                    {["general", "obc", "sc", "st", "ews"].map((cast) => (
                      <SelectItem key={cast} value={cast}>
                        {cast.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.cast && <p className="text-red-500 text-sm">{errors.cast.message}</p>}
          </div>
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
