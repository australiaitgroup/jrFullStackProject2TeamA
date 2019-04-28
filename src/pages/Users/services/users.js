import request from '../../../utils/requestWithJwt'
const baseUrl = `http://${SERVER}:${SERVER_PORT}`

const defaultPwd = 123456;
export function addUser(params) {
    const newParams = {
        ...params,
        password: defaultPwd,
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

export function queryUser() {

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