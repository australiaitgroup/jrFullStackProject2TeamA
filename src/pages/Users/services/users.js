import request from '../../../utils/requestWithJwt'
const baseUrl = `http://${SERVER}:${SERVER_PORT}`

const defaultPwd = 123456;
export function addUser({ firstName, lastName, email, address, password = defaultPwd }) {

}

export function updateUser() {

}

export function queryUser() {

}

export function queryAllUsers() {
    return request(`${baseUrl}/user`, {
        method: 'GET'
    })
}
export function deleteUser() {

}