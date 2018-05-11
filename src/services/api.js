import { stringify } from 'qs';
import request from '../utils/request';
import { serverUrl } from '../config';

export async function commonGet(params) {
  const { url } = params;
  delete params.url;
  return request(`${serverUrl}${url}?${stringify(params)}`);
}

export async function commonPost(params) {
  const { url } = params;
  delete params.url;
  return request(`${serverUrl}${url}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
