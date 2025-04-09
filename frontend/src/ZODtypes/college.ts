import { z } from "zod";

 export const collegeSchema = z.object({
    _id: z.string().optional(),
    collegeName: z.string().min(2, "College name is required"),
    rankingNIRF: z.number().min(0, "Ranking cannot be negative"),
    university: z.string().min(2, "University name is required"),
    type: z.enum(["private", "government", "deemed", "state"]),
    typeOfCollege: z.enum(["engineering", "medical", "management", "law", "arts", "science"]),
    logo: z
        .instanceof(File, { message: "Profile image is required" })
        .refine((file) => file?.type.startsWith("image/"), "Only image files are allowed"),
    address: z.object({
        city: z.string().min(2, "City is required"),
        state: z.string().min(2, "State is required"),
        country: z.string().default("India"),
    }),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    email: z.string().email("Invalid email address"),
    contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
    description: z.string().optional(),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
    placementStatistics: z.object({
        averagePackage: z.number().min(0, "Average package cannot be negative").optional(),
        highestPackage: z.number().min(0, "Highest package cannot be negative").optional(),
        topRecruiters: z.array(z.string()).optional(),
    }),
});




export const CollegeStateSchema = z.object({
  getAll: z.array(collegeSchema).nullable(),
  getOneAll: z.any().nullable(),
  loading: z.boolean(),
  error: z.string().nullable(),
});


export const courseSchema = z.object({
  branches: z.array(z.string()).min(1, "At least one branch is required"),
  seats: z.number().min(0, "Seats cannot be negative"),
  minimumEntranceScore: z.number().min(0, "Minimum score cannot be negative"),
});


export type CollegeState = z.infer<typeof CollegeStateSchema>;
export type ICollege = z.infer<typeof collegeSchema>;
export type ICourse = z.infer<typeof courseSchema>;
