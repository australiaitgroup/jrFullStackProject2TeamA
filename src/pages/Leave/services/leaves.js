import request from '../../../utils/requestWithJwt'
const baseUrl = `http://${SERVER}:${SERVER_PORT}/api`

export function getLeaveRequest() {
    return request(`${baseUrl}/leaves/status/pending`, {
        method: 'GET'
    })
}

export function getLeaveApproved() {

}

export function approveLeave(payload) {
    //payload={
    //    id:****,
    //    action:*****
    //}
    console.log(payload);
    return request(`${baseUrl}/leaves/approve`, {
        method: 'PATCH',
        body:payload
    })
}