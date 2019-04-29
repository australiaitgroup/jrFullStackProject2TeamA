import request from '../../../utils/requestWithJwt'
const baseUrl = `http://${SERVER}:${SERVER_PORT}`

const defaultPwd = 123456;
export function addUser(params) {
    const { password } = params;
    if (!password) {
        password = defaultPwd;
    }
    const newParams = {
        ...params,
        password,
    }
    return request(`${baseUrl}/user/add`, {
        method: 'POST',
        body: newParams,
    });
}

export function updateUser(params) {

    const { fields, id } = params;
    console.log(fields)
    return request(`${baseUrl}/user/${id}`, {
        method: 'PATCH',
        body: fields,
    });
}

export function queryUser(payload) {
    const { firstName, lastName, email } = payload;
    return request(`${baseUrl}/user/?email=${email}`, {
        method: 'GET'
    })
}

export function queryAllUsers() {
    return request(`${baseUrl}/user`, {
        method: 'GET'
    })
}
export function deleteUser(id) {
    return request(`${baseUrl}/user/${id}`, {
        method: 'DELETE'
    })
}