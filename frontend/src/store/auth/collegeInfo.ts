import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  _id: "",
  collegeName: "",
  streams: [],
};

const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    deleteCourseById: (state, action) => {
      const { courseId } = action.payload;
      state.streams = state.streams.map((stream: any) => ({
        ...stream,
        courses: stream.courses.filter(
          (course: any) => course._id !== courseId
        ),
      }));
    },

    updateCourseById: (state, action) => {
      const { courseId, updatedCourse } = action.payload;
      state.streams = state.streams.map((stream: any) => ({
        ...stream,
        courses: stream.courses.map((course: any) =>
          course._id === courseId ? { ...course, ...updatedCourse } : course
        ),
        }));
    },

    addStream:(state, action) => {
      const { stream } = action.payload;
      state.streams = [...state.streams, stream];
    },

    addCourseWithinStreamByStreamId: (state, action) => {
      const { streamId, course } = action.payload;
      state.streams = state.streams.map((stream: any) => {
        if (stream._id === streamId) {
          return {
            ...stream,
            courses: [...stream.courses, course],
          };
        }
        return stream;
      });
    },

    deleteStreamById: (state, action) => {
      const { streamId } = action.payload;
      state.streams = state.streams.filter((stream:any) => stream._id !== streamId);
    },

    setCollegeData: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  deleteCourseById,
  addCourseWithinStreamByStreamId,
  deleteStreamById,
  setCollegeData,
  updateCourseById,
  addStream
} = collegeSlice.actions;

export default collegeSlice.reducer;
