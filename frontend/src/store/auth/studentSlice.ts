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

export const updateEducationDetailsServiceAction = createAsyncThunk(
    "student/updateEducationDetails",
    async ({ data }: { data: IStudentEducation }, { rejectWithValue }) => {
        try {
            const response = await updateEducationDetailsService(data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateStudentProfileServiceAction = createAsyncThunk(
    "student/updateStudentProfile",
    async ({ data }: { data: IStudent }, { rejectWithValue }) => {
        try {
            const response = await updateStudentProfileService(data);
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
            return response?.data?.data;
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
                state.error = payload as string;
            }
            )
            .addCase(updateStudentProfileServiceAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(updateStudentProfileServiceAction.fulfilled, (state, ) => {
                state.loading = false;
                toast.success("Student profile updated successfully");
            }
            )
            .addCase(updateStudentProfileServiceAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
                toast.error(payload as string);
            }
            )
            .addCase(updateEducationDetailsServiceAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(updateEducationDetailsServiceAction.fulfilled, (state, ) => {
                state.loading = false;
                toast.success("Student education details updated successfully");
            }
            )
            .addCase(updateEducationDetailsServiceAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
                toast.error(payload as string);
            }
            );
    },
});

export default studentSlice.reducer;
