import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { ICollegeAdminState,  ProfileFormValues } from "@/ZODtypes/CollegeAdmin";
import {
    createCollegeAdminProfileService,
    getCollegeAdminProfileService,
} from "@/services/apis";

// Define the initial state
const initialState: ICollegeAdminState = {
    data: null,
    loading: false,
    error: null,
};

export const createCollegeAdminProfileAction = createAsyncThunk(
    "collegeAdmin/createCollegeAdminProfile",
    async ({ data }: { data: ProfileFormValues }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("profilePicture", data.profilePicture);
            formData.append("verificationDocuments", data.verificationDocuments);
            formData.append("fullName", data.fullName);
            formData.append("phoneNumber", JSON.stringify(data.phoneNumber));
            formData.append("dateOfBirth", data.dateOfBirth.toString());
            formData.append("gender", data.gender);
            formData.append("highestEducation", JSON.stringify(data.highestEducation));
            formData.append("bio", data.bio ? data.bio : "");
            const response = await createCollegeAdminProfileService(formData);
            if (response?.data?.data) {
                return response.data.data;
            }
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const getCollegeAdminProfileAction = createAsyncThunk(
    "collegeAdmin/getCollegeAdminProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCollegeAdminProfileService();
            if (response?.data?.data) {
                return response.data.data;
            }
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const collegeAdminSlice = createSlice({
    name: "collegeAdmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCollegeAdminProfileAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createCollegeAdminProfileAction.fulfilled,
                (state, { payload }) => {
                    state.loading = false;
                    toast.success("College Admin profile created successfully");
                }
            )
            .addCase(
                createCollegeAdminProfileAction.rejected,
                (state, { payload }) => {
                    state.loading = false;
                    state.error = payload as string;
                    toast.error(payload as string);
                }
            )
            .addCase(getCollegeAdminProfileAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCollegeAdminProfileAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(getCollegeAdminProfileAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
                toast.error(payload as string);
            });
    },
});

export default collegeAdminSlice.reducer;
