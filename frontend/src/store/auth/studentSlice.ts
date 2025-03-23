import { IStudent, IStudentEducation, IStudentState } from "@/types/profile";
import { toast } from "sonner";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createEducationDetailsService,
    createStudentProfileService,
    getStudentDataService,
    updateEducationDetailsService,
    updateStudentProfileService,
} from "@/services/apis";

// Define the initial state
const initialState: IStudentState = {
    student: null,
    studentEducation: null,
    loading: false,
    error: null,
};

export const studentProfileAction = createAsyncThunk(
    "student/createStudentProfile",
    async ({ data }: { data: IStudent }, { rejectWithValue }) => {
        try {
            const response = await createStudentProfileService(data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const studentEducationAction = createAsyncThunk(
    "student/createEducationDetails",
    async ({ data }: { data: IStudentEducation }, { rejectWithValue }) => {
        try {
            const response = await createEducationDetailsService(data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateEducationDetailsAction = createAsyncThunk(
    "student/updateEducationDetails",
    async ({ data }: { data: IStudentEducation }, { rejectWithValue }) => {
        try {
            const response = await updateEducationDetailsService(data);
        } catch (error: any) {
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const updateStudentProfileAction = createAsyncThunk(
    "student/updateStudentProfile",
    async ({ data, id }: { data: IStudent ,id:string}, { rejectWithValue }) => {
        try {
            const response = await updateStudentProfileService(data,id);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getStudentDataAction = createAsyncThunk(
    "student/getStudentData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getStudentDataService();
            if(response?.data?.data){
                return response.data.data;
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(studentProfileAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(studentProfileAction.fulfilled, (state, ) => {
                state.loading = false;
                toast.success("Student profile created successfully");
            })
            .addCase(studentProfileAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
                toast.error(payload as string);
            })
            .addCase(studentEducationAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(studentEducationAction.fulfilled, (state, ) => {
                state.loading = false;
                toast.success("Student education details created successfully");
            }
            )
            .addCase(studentEducationAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
                toast.error(payload as string);
            }
            )
            .addCase(getStudentDataAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(getStudentDataAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.student = payload.student;
                state.studentEducation = payload.studentEducation;
            }
            )
            .addCase(getStudentDataAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.student = null;
                state.studentEducation = null;
                state.error = payload as string;
            }
            )
            .addCase(updateStudentProfileAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(updateStudentProfileAction.fulfilled, (state, ) => {
                state.loading = false;
                toast.success("Student profile updated successfully");
            }
            )
            .addCase(updateStudentProfileAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
                toast.error(payload as string);
            }
            )
            .addCase(updateEducationDetailsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(updateEducationDetailsAction.fulfilled, (state, ) => {
                state.loading = false;
                toast.success("Student education details updated successfully");
            }
            )
            .addCase(updateEducationDetailsAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
                toast.error(payload as string);
            }
            );
    },
});

export default studentSlice.reducer;
