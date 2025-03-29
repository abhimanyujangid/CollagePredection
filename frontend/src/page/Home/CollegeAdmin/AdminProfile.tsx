import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileFormValues, profileSchema } from "@/ZODtypes/CollegeAdmin";
import { toast } from "sonner";
import FormFieldComponent from "@/components/FormFieldComponent";
import NumberFormField from "@/components/NumberFormField";
import SelectFormField from "@/components/SelectFormField";
import TextareaFormField from "@/components/TextareaFormField";
import DatePicker from "@/components/DatePicker";
import FileUploadButton from "@/components/FileUploadButton";
import UserAvatar from "@/components/UserAvatar";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { createCollegeAdminProfileAction, getCollegeAdminProfileAction } from "@/store/auth/collegeAdminSlice";
import { DEGREE_LEVELS, FIELDS_OF_STUDY } from "@/constant/dropDownData";





export function AdminProfile() {
  const [profilePreview, setProfilePreview] = useState<string | undefined>(undefined);
  const { data,  loading, error } = useAppSelector((state) => state.collegeAdmin);
  const [documents, setDocuments] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: data || {
      fullName: "",
    },
  });

useEffect(()=>{
  dispatch(getCollegeAdminProfileAction())
  if(data) {
    setProfilePreview(data?.profilePicture?.url)
  }
},[])


  const onSubmit =  (data: ProfileFormValues) => {
      dispatch(createCollegeAdminProfileAction({ data }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("profilePicture", file);
    }
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfilePreview(objectUrl);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if(files) {
      form.setValue("verificationDocuments", files);
      setDocuments(files);
    }
  };
    

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
       
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <UserAvatar
                src={typeof profilePreview === "string" ? profilePreview : undefined}
                name={form.watch("fullName")}
                size="xl"
                />
             <FileUploadButton
                onChange={handleProfilePictureChange}
                label="Upload Profile "
                accept="image/*"
                errorMessage={form.formState.errors.profilePicture?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <FormFieldComponent
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                loading={loading}
              />

              {/* Gender */}
             <SelectFormField
                control={form.control}
                name="gender"
                placeholder="Select a gender"
                label="Gender"
                options={['male', 'female', 'other']}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber.number"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex">
                      <Input
                        className="w-20 mr-2"
                        value="+91"
                        disabled
                      />
                      <FormControl>
                        <Input placeholder="1234567890" {...field} loading={loading} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <DatePicker name="dateOfBirth" label="Date of Birth" />
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Highest Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectFormField
                 control={form.control}
                  name="highestEducation.degree"
                  label="Degree"  
                  placeholder="Bachelor's"
                  options={DEGREE_LEVELS as string[]}
                />
              <SelectFormField
                  control={form.control}
                  name="highestEducation.fieldOfStudy"
                  label="Field of Study"
                  placeholder="Computer Science"
                  options={FIELDS_OF_STUDY as string[]}
                />
                <FormFieldComponent
                  control={form.control}
                  name="highestEducation.institution"
                  label="Institution"
                  placeholder="ABC University"
                  loading={loading}
                />
               <NumberFormField
                  control={form.control}
                  name="highestEducation.yearOfPassing"
                  label="Year of Passing"
                  placeholder="2023"
                  loading={loading}
                />
                
              </div>
            </div>

            {/* Verification Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Verification Documents</h3>
              <div className="space-y-2">
               <FileUploadButton
                  onChange={handleDocumentUpload}
                  label=" Documents"
                  accept=".pdf,.doc,.docx"
                  errorMessage={form.formState.errors.verificationDocuments?.message}
                />
                
                {documents  && (
                  <ul className="mt-2 space-y-1">
       
                      <li
                        className="text-sm text-muted-foreground flex items-center"
                      >
                        📄 { documents?.name}
                      </li>
                    
                  </ul>
                )}
              </div>
            </div>

            {/* Bio */}
           <TextareaFormField 
              control={form.control}
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {data ? "Update Profile" : "Create Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}