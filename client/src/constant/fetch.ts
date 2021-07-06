const PORT = process.env.NODE_ENV === 'development' ? 3001 : 3000;
export const API_HOST = `http://localhost:${PORT}/api`;

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
