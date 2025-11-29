// src/slices/jobsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await apiClient.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data; // array of jobs
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to fetch jobs";
      return rejectWithValue(message);
    }
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (
    { companyName, jobTitle, description, salary },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      const res = await apiClient.post(
        "/create/job",
        { companyName, jobTitle, description, salary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // created job
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create job";
      return rejectWithValue(message);
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearJobStatus(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch jobs";
      })
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.successMessage = "Job created successfully";
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create job";
      });
  },
});

export const { clearJobStatus } = jobsSlice.actions;
export default jobsSlice.reducer;
