
// This file contains the types for the profile of the user.



// ================================== Student Profile ==================================


export interface IStudentState{
    student: IStudent | null;
    studentEducation: IStudentEducation | null;
    loading: boolean;
    error: string | null;
}

export interface IStudent {
    _id: string;
    userId: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: AvailableGenders;
    cast: AvailableCasts;
    hobbies?: string[];
    preferences?: {
        preferredCourses: string;
        preferredLocations: string[];
    };
}

export interface ITenth {
    _id?: string;
    schoolName: string;
    board: string;
    state: string;
    percentage: number;
    yearOfPassing: number;
}

export interface ISubjectWithMarks {
    _id?: string;
    subject: string;
    marks: number;
}

export interface ITwelfth {
    _id?: string;
    schoolName: string;
    stream: string;
    subjectsWithMarks: ISubjectWithMarks[];
    board: string;
    state: string;
    percentage: number;
    yearOfPassing: number;
}

export interface ICompetitiveExam {
    _id?: string;
    examName: string;
    score: number;
    yearOfPassing: number;
    rank: number;
}

export interface IStudentEducation {
    _id?: string;
    userId: string;
    tenth: ITenth;
    twelfth: ITwelfth;
    competitiveExams?: ICompetitiveExam[];
}

export type AvailableGenders = "male" | "female" | "other";
export type AvailableCasts = "general" | "obc" | "sc" | "st" | "ews";



// ================================== College Admin Profile ==================================
