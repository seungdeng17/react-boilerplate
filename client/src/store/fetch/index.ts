import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from '@constant/fetch';

const initialState = {
  fetchInfo: {
    fetchStatusMap: {},
    isSlowMap: {},
    totalCountMap: {},
    errorMessageMap: {},
    nextPageMap: {},
  },
};

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setValue: (state: any, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setFetchStatus: (state: any, action) => {
      const { actionType, fetchKey, status, totalCount, nextPage, errorMessage } = action.payload;
      if (!state.fetchInfo.fetchStatusMap[actionType]) {
        state.fetchInfo.fetchStatusMap[actionType] = {};
      }
      state.fetchInfo.fetchStatusMap[actionType][fetchKey] = status;

      if (status !== FetchStatus.Request) {
        if (state.fetchInfo.isSlowMap[actionType]) {
          state.fetchInfo.isSlowMap[actionType][fetchKey] = false;
        }
        if (totalCount !== undefined) {
          if (!state.fetchInfo.totalCountMap[actionType]) {
            state.fetchInfo.totalCountMap[actionType] = {};
          }
          state.fetchInfo.totalCountMap[actionType][fetchKey] = totalCount;
        }
        if (nextPage !== undefined) {
          if (!state.fetchInfo.nextPageMap[actionType]) {
            state.fetchInfo.nextPageMap[actionType] = {};
          }
          state.fetchInfo.nextPageMap[actionType][fetchKey] = nextPage;
        }
        if (!state.fetchInfo.errorMessageMap[actionType]) {
          state.fetchInfo.errorMessageMap[actionType] = {};
        }
        if (errorMessage) {
          state.fetchInfo.errorMessageMap[actionType][fetchKey] = errorMessage;
        }
      }
    },
    setIsSlow: (state: any, action) => {
      const { actionType, fetchKey, isSlow } = action.payload;
      if (!state.fetchInfo.isSlowMap[actionType]) {
        state.fetchInfo.isSlowMap[actionType] = {};
      }
      state.fetchInfo.isSlowMap[actionType][fetchKey] = isSlow;
    },
    fetchSampleIp: () => {},
  },
});

export const { actions, reducer } = fetchSlice;
export default reducer;
