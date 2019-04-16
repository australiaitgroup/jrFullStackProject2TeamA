import request from '@/utils/requestWithJwt';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {

  return request('/api/currentUser');
}

export function queryCurrentUser(params) {
  //userId = params
  const userId = params
  return request(`http://localhost:3000/user/${userId}`,{
    method:'GET'
  })
}