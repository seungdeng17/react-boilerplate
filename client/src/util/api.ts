import axios from 'axios';
import { API_HOST, ResultCode } from '@constant/fetch';

export function request({ method = 'get', url, params, data }: { [key: string]: any }) {
  return axios({
    method,
    url,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true,
  }).then((response) => {
    const { resultCode } = response.data;
    if (resultCode < 0) {
      console.warn('http error!');
    }
    return {
      isSuccess: resultCode === ResultCode.Success,
      resultCode,
    };
  });
}
