import { z } from "zod";

const studentSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["male", "female", "other"], { message: "Select a valid gender" }),
  cast: z.enum(["general", "obc", "sc", "st", "ews"], { message: "Select a valid cast" }),
});


const studentEducationSchema = z.object({
  tenth: z.object({
    schoolName: z.string().min(1, "School Name is required"),
    board: z.string().min(1, "Board is required"),
    state: z.string().min(1, "State is required"),
    percentage: z.number().min(1, "Percentage is required").max(100, "Percentage must be between 1 and 100"),
    yearOfPassing: z.number().min(1900, "Year of Passing must be after 1900").max(2100, "Year of Passing must be before 2100"),
  }),
  twelfth: z.object({
    schoolName: z.string().min(1, "School Name is required"),
    stream: z.string().min(1, "Stream is required"),
    subjectsWithMarks: z.array(z.object({
      subject: z.string().min(1, "Subject is required"),
      marks: z.number().min(1, "Marks are required").max(100, "Marks must be between 1 and 100"),
    })).min(1, "At least one subject is required"),
    board: z.string().min(1, "Board is required"),
    state: z.string().min(1, "State is required"),
    percentage: z.number().min(1, "Percentage is required").max(100, "Percentage must be between 1 and 100"),
    yearOfPassing: z.number().min(1900, "Year of Passing must be after 1900").max(2100, "Year of Passing must be before 2100"),
  }),
  competitiveExams: z.array(z.object({
    examName: z.string().min(1, "Exam Name is required"),
    score: z.number().min(1, "Score is required"),
    yearOfPassing: z.number().min(1900, "Year of Passing must be after 1900").max(2100, "Year of Passing must be before 2100"),
    rank: z.number().min(1, "Rank is required"),
  })).min(1, "At least one competitive exam is required"),
});



export { studentSchema, studentEducationSchema };