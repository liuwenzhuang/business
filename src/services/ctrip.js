import { stringify } from 'qs';
import request from '../utils/request';
import { serverUrl } from '../config';

export async function getOrgs() {
  return request(`${serverUrl}/ctrip/orginfo`);
}

export async function getUserTable(params) {
  return request(`${serverUrl}/ctrip/userauth?${stringify(params)}`);
}

export async function getDeptTable(params) {
  return request(`${serverUrl}/ctrip/deptauth?${stringify(params)}`);
}

export async function updateDeptAuth(params) {
  const { orgpk } = params;
  return request(`${serverUrl}/ctrip/updatedeptauth?orgpk=${orgpk}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateUserAuth(params) {
  const { orgpk } = params;
  return request(`${serverUrl}/ctrip/updateuserauth?orgpk=${orgpk}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
