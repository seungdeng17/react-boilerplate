import axios from 'axios';
import { API_HOST, RESULT_CODE } from '@constant/fetch';

type RequestResult = {
  isSuccess: boolean;
  resultCode: number;
  data: any;
};

export function request({ method = 'get', url, params, data }: { [key: string]: any }): Promise<RequestResult> {
  return axios({
    method,
    url,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true,
  }).then((response) => {
    const { resultCode, data } = response.data;
    if (resultCode < 0) {
      console.error('http error!');
    }
    return {
      isSuccess: resultCode === RESULT_CODE.SUCCESS,
      resultCode,
      data,
    };
  });
}
