import request from '@/utils/requestWithJwt';
const baseUrl = `http://${SERVER}:${SERVER_PORT}/api`

export async function getLeave(id){
	return request(`${baseUrl}/leaves/${id}`);
}
export async function getLeaves(){
	return request(`${baseUrl}/leaves/`);
}
export async function addLeave( payload ) {
	console.log(payload);
	return request(`${baseUrl}/leaves/`, {
		method: 'POST',
		body: payload,
	});
}
// export async function deleteLeave( payload ) {
// 	return request({
// 		method: 'DELETE',
// 		url: `${baseUrl}/leaves/`,
// 		data: payload,
// 	});
// }

