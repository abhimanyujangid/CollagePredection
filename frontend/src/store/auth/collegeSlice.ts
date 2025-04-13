import { createCollegeService, getAdministratorAllCollegesService, getCollegeByIdService } from '@/services/apis';
import { CollegeState, ICollege } from '@/ZODtypes/college';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';


const initialState : CollegeState = {
    getAll: null,
    getOneAll: null,
    loading: false,
    error: null,
};

export const createCollegeAction = createAsyncThunk(
    "collegeAdmin/createCollege",
    async (data: ICollege, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", data._id || "");
            formData.append("collegeName", data.collegeName);
            formData.append("rankingNIRF", JSON.stringify(data.rankingNIRF));
            formData.append("university", data.university);
            formData.append("type", data.type);
            formData.append("typeOfCollege", data.typeOfCollege);
            formData.append("logo", data.logo);
            formData.append("address", JSON.stringify(data.address));
            formData.append("website", data.website ? data.website : "");
            formData.append("email", data.email);
            formData.append("contactNumber", data.contactNumber);
            formData.append("description", data.description ? data.description : "");
            formData.append("rating", JSON.stringify(data.rating));
            formData.append("placementStatistics", JSON.stringify(data.placementStatistics));
            const response = await createCollegeService(formData);
            if (response?.data?.data) {
                return response.data.data;
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);
export const getCollegeByIdAction = createAsyncThunk(
    "collegeAdmin/getCollegeById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await getCollegeByIdService(id);
            if (response?.data?.data) {
                return response.data.data;
            }
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const getAdministratorAllCollegesAction = createAsyncThunk(
    "collegeAdmin/getAdministratorAllColleges",
    async ({ page = 1, limit = 10 }: { page?: number, limit?: number }, { rejectWithValue }) => {
        try {
            const response = await getAdministratorAllCollegesService({ page, limit });
            if (response?.data?.data) {
                return response.data.data;
            }
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);


const collegeSlice = createSlice({
    name: "collegeAdmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCollegeAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(
            createCollegeAction.fulfilled,
            (state, { payload }) => {
                state.loading = false;
                toast.success("College created successfully");
            }
        )
        .addCase(
            createCollegeAction.rejected,
            (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            }
        )
        .addCase(getCollegeByIdAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCollegeByIdAction.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getOneAll = payload;
        })
        .addCase(getCollegeByIdAction.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
            toast.error(payload as string);
        })
        .addCase(getAdministratorAllCollegesAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAdministratorAllCollegesAction.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAll = payload;
        })
        .addCase(getAdministratorAllCollegesAction.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
            toast.error(payload as string);
        });
        
    },
});

export default collegeSlice.reducer;
