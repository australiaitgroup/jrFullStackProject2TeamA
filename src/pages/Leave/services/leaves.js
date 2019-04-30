import request from '../../../utils/requestWithJwt'
const baseUrl = `http://${SERVER}:${SERVER_PORT}`

export function getLeaveRequest() {
    return request(`${baseUrl}/leaves/status/request`, {
        method: 'GET'
    })
}

export function getLeaveApproved() {

}

export function getLeaveStatus() {

}