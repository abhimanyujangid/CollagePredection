
// This file contains the types for the profile of the user.
import { cast } from "@/constant/Dummydata";
import { max } from "date-fns";
import { z } from "zod";



// ================================== Student Profile ==================================

export const AvailableGenders = z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Invalid gender selection" })
});

export const AvailableCasts = z.enum(cast, {
    errorMap: () => ({ message: "Invalid caste selection" })
});

export const ISubjectWithMarksSchema = z.object({
    _id: z.string().optional(),
    subject: z.string().min(1, "Subject name is required"),
    maxMarks: z.number().min(1, "Max marks must be at least 1"),
    obtainedMarks: z.number().min(0, "Marks obtained cannot be negative")
});

export const ITenthSchema = z.object({
    _id: z.string().optional(),
    schoolName: z.string().min(1, "School name is required"),
    board: z.string().min(1, "Board is required"),
    state: z.string().min(1, "State is required"),
    percentage: z.number().min(0, "Percentage cannot be negative").max(100, "Percentage cannot exceed 100"),
    yearOfPassing: z.number().min(1900, "Invalid year of passing")
});

export const ITwelfthSchema = z.object({
    _id: z.string().optional(),
    schoolName: z.string().min(1, "School name is required"),
    stream: z.string().min(1, "Stream is required"),
    subjectsWithMarks: z.array(ISubjectWithMarksSchema).nonempty("Subjects with marks are required"),
    board: z.string().min(1, "Board is required"),
    state: z.string().min(1, "State is required"),
    percentage: z.number().min(0, "Percentage cannot be negative").max(100, "Percentage cannot exceed 100"),
    yearOfPassing: z.number().min(1900, "Invalid year of passing")
});

export const ICompetitiveExamSchema = z.object({
    _id: z.string().optional(),
    examName: z.string().min(1, "Exam name is required"),
    score: z.number().min(0, "Score cannot be negative"),
    yearOfPassing: z.number().min(1900, "Invalid year of passing"),
    rank: z.number().min(1, "Rank must be at least 1")
});

export const IStudentEducationSchema = z.object({
    _id: z.string().optional(),
    userId: z.string().min(1, "User ID is required"),
    tenth: ITenthSchema,
    twelfth: ITwelfthSchema,
    competitiveExams: z.array(ICompetitiveExamSchema).optional()
});

export const IStudentSchema = z.object({
    _id: z.string().optional(),
    userId: z.string().optional(),
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: AvailableGenders,
    cast: AvailableCasts,
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
   
});

export const IStudentStateSchema = z.object({
    student: IStudentSchema.nullable(),
    studentEducation: IStudentEducationSchema.nullable(),
    loading: z.boolean(),
    error: z.string().nullable()
});

export type IStudent = z.infer<typeof IStudentSchema>;
export type IStudentEducation = z.infer<typeof IStudentEducationSchema>;
export type ITenth = z.infer<typeof ITenthSchema>;
export type ITwelfth = z.infer<typeof ITwelfthSchema>;
export type ICompetitiveExam = z.infer<typeof ICompetitiveExamSchema>;
export type IStudentState = z.infer<typeof IStudentStateSchema>;


// ================================== College Admin Profile ==================================
