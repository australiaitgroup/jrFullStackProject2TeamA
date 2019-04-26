import request from '@/utils/requestWithJwt';
const baseUrl = `http://${SERVER}:${SERVER_PORT}`

export async function query() {
  return request('/api/users');
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