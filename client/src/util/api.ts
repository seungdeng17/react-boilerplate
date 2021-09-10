import axios from 'axios';
import { API_HOST, RESULT_CODE } from '@constant/fetch';

export function request({ method = 'get', url, params, data }: { [key: string]: any }) {
  return axios({
    method,
    url,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true,
  })
    .then((response) => {
      const { resultCode, data } = response.data;
      if (resultCode < 0) {
        throw new Error('http error!');
      }
      return {
        isSuccess: resultCode === RESULT_CODE.SUCCESS,
        resultCode,
        data,
      };
    })
    .catch((error) => {
      console.log(error);
    });
}
