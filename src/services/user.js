import request from '@/utils/requestWithJwt';
const baseUrl = `http://${SERVER}:${SERVER_PORT}/api`

export async function users() {
  return request('/api/users');
}

export async function usersByRole() {
  return request(`/api/users/user/${role}`);
}

export async function queryCurrent() {

  return request('/api/currentUser');
}

export function queryCurrentUser(params) {
  //userId = params
  const userId = params
  return request(`${baseUrl}/user/${userId}`,{
    method:'GET'
  })
}