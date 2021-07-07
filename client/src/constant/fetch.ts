export const API_HOST = process.env.REACT_APP_API_HOST + '/api';

export const FETCH_PAGE = Symbol('FETCH_PAGE');
export const FETCH_KEY = Symbol('FETCH_KEY');

export const FetchStatus = {
  Request: 'Request',
  Success: 'Success',
  Fail: 'Fail',
};

export const ResultCode = {
  Success: 0,
};
