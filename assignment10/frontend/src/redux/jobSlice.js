import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'jobs',
  initialState: { items: [], loading: false, page: 1, total: 0 },
  reducers: {
    setJobs(state, action){ state.items = action.payload; },
    setLoading(state, action){ state.loading = action.payload; },
    setPage(state, action){ state.page = action.payload; }
  }
});

export const { setJobs, setLoading, setPage } = slice.actions;
export default slice.reducer;
