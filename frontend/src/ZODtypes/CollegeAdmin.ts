import * as z from "zod";

export const phoneNumberSchema = z.object({
  countryCode: z.string().default("+91"),
  number: z.string().min(10, "Phone number must be at least 10 digits")
});

export const backendDocumentSchema = z.object({
  url: z.string().url("Invalid URL"),
  public_id: z.string(),
})

export const educationSchema = z.object({
  degree: z.string().min(2, "Degree is required"),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  institution: z.string().min(2, "Institution is required"),
  yearOfPassing: z.number().min(1900).max(new Date().getFullYear())
});

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phoneNumber: phoneNumberSchema,
  gender: z.enum(["male", "female", "other"]),
  profilePicture: z
      .instanceof(File, { message: "Profile image is required" })
      .refine((file) => file?.type.startsWith("image/"), "Only image files are allowed") || backendDocumentSchema,
  dateOfBirth: z.date(),
  highestEducation: educationSchema,
  verificationDocuments: z
      .instanceof(File, { message: "Document is required" }) || backendDocumentSchema,
      
  bio: z.string().max(300, "Bio must not exceed 300 characters").optional(),
});

export const ICollegeAdminStateSchema = z.object({
  data: profileSchema.nullable(),
  loading: z.boolean(),
  error: z.string().nullable(),
});

export type ICollegeAdminState = z.infer<typeof ICollegeAdminStateSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;