import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { IStudent } from "@/types/profile";

const studentSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["male", "female", "other"], { message: "Select a valid gender" }),
  cast: z.enum(["general", "obc", "sc", "st", "ews"], { message: "Select a valid cast" }),
  hobbies: z.array(z.string()).optional(),
});

export default function PersonalInformationForm() {
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<IStudent>({
    resolver: zodResolver(studentSchema),
  });
  const [hobbies, setHobbies] = useState<string[]>([]);
  const hobbyInput = watch("hobbies");

  const addHobby = () => {
    if (hobbyInput && !hobbies.includes(hobbyInput)) {
      setHobbies([...hobbies, hobbyInput]);
      setValue("hobbies", "");
    }
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter((h) => h !== hobby));
  };

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Card className="p-4 bg-muted/50">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <p className="text-sm text-muted-foreground">Update your personal details and preferences.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Full Name</Label>
            <Input {...register("fullName")} placeholder="John Smith" />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>
          <div className="col-span-2">
            <Label>Email</Label>
            <Input {...register("email")} type="email" placeholder="john.smith@example.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input {...register("phoneNumber")} placeholder="1234567890" />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input {...register("dateOfBirth")} type="date" />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
          </div>
          <div>
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cast" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                    <SelectItem value="ews">EWS</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.cast && <p className="text-red-500 text-sm">{errors.cast.message}</p>}
          </div>
          <div className="col-span-2">
            <Label>Hobbies</Label>
            <div className="flex gap-2">
              <Input {...register("hobbies")} placeholder="Enter hobby" />
              <Button type="button" onClick={addHobby}>Add</Button>
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
        <Button type="submit">Save</Button>
      </Card>
    </form>
  );
}
