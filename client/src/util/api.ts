import axios from 'axios';
import { API_HOST, ResultCode } from '@constant/fetch';

export function request({ method = 'get', url, params, data }: { [key: string]: any }) {
  return axios({
    url,
    method,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true,
  }).then((response) => {
    const { resultCode, resultMessage, totalCount } = response.data;
    if (resultCode < 0) {
      console.warn('http error!');
    }
    return {
      isSuccess: resultCode === ResultCode.Success,
      data: response.data.data,
      resultCode,
      resultMessage,
      totalCount,
    };
  });
}
