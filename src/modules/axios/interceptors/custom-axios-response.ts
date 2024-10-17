import { AxiosResponse } from 'axios';

export const customAxiosResponse = (response: AxiosResponse) => {
  // if (response.headers['x-leg-current-time']) {
  //   sessionStorage.setItem('game_time_offset', String(Number(response.headers['x-leg-current-time']) - Date.now()));
  // }

  return response;
};
