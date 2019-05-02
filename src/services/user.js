import request from '@/utils/requestWithJwt';
const baseUrl = `http://${SERVER}:${SERVER_PORT}/api`

export async function queryUsers() {
  return request(`${baseUrl}/api/users`);
}

export async function usersByRole(role) {
  console.log('sssss');
  return request(`${baseUrl}/users/user/${role}`,{
    method:'GET'
  });
}

export async function queryCurrent() {

  return request('/api/currentUser');
}

export function queryCurrentUser(params) {
  //userId = params
  const userId = params
  return request(`${baseUrl}/users/${userId}`,{
    method:'GET'
  })
}