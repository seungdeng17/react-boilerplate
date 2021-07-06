import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
});

export const actions = commonSlice.actions;
export default commonSlice.reducer;
