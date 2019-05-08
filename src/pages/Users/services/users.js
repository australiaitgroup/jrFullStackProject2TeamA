import request from '../../../utils/requestWithJwt'
const baseUrl = `http://${SERVER}:${SERVER_PORT}/api`

const defaultPwd = 123456;
export function addUser(params) {
    const { confirm } = params;
    const password = confirm ||defaultPwd;
    const newParams = {
        ...params,
        password,
    }
    return request(`${baseUrl}/users/add`, {
        method: 'POST',
        body: newParams,
    });
}

export function updateUser(params) {

    const { fields, id } = params;
    console.log(fields)
    return request(`${baseUrl}/users/${id}`, {
        method: 'PATCH',
        body: fields,
    });
}

export function queryUser(payload) {
    const { firstName, lastName, email } = payload;
    return request(`${baseUrl}/users/?email=${email}`, {
        method: 'GET'
    })
}

export function queryAllUsers() {
    return request(`${baseUrl}/users`, {
        method: 'GET'
    })
}
export function deleteUser(id) {
    return request(`${baseUrl}/users/${id}`, {
        method: 'DELETE'
    })
}