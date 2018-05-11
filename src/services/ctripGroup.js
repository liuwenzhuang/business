import { stringify } from 'qs';
import request from '../utils/request';
import { serverUrl } from '../config';

export async function getGroups() {
  return request(`${serverUrl}/ctrip/ctripGroup/groups`);
}

export async function getGroup(params) {
  return request(`${serverUrl}/ctrip/ctripGroup/groups?${stringify(params)}`);
}

export async function getCtripClientManager() {
  return request(`${serverUrl}/ctrip/ctripClientManager/find`);
}

export async function updateCtripClientManager(params) {
  return request(`${serverUrl}/ctrip/ctripClientManager/add`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteGroup(params) {
  return request(`${serverUrl}/ctrip/ctripGroup/delgroup`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addGroup(params) {
  return request(`${serverUrl}/ctrip/ctripGroup/addGroup`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateGroup(params) {
  return request(`${serverUrl}/ctrip/ctripGroup/updateGroup`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getUserTable(params) {
  return request(`${serverUrl}/ctrip/ctripGroupMember/groupmembers`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addGroupUsers(params) {
  return request(`${serverUrl}/ctrip/ctripGroupMember/addgroupmembers`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getGroupUserTable(params) {
  return request(`${serverUrl}/ctrip/userfilter/users`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteGroupUsers(params) {
  return request(`${serverUrl}/ctrip/ctripGroupMember/delgroupmembers`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function commonPost(params) {
  return request(`${serverUrl}${params.url}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
