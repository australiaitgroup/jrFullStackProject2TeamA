import request from '@/utils/request';

export async function user() {
  return request('/api/users');
}

export async function usersByRole() {
  return request(`/api/users/user/${role}`);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
