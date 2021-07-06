import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setValue: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
  },
});

export const { setValue } = commonSlice.actions;
export default commonSlice.reducer;
