import request from '@/utils/request';

export async function getLeave(id){
	return request(`/api/leaves/${id}`);
}
export async function getLeaves(){
	return request(`/api/leaves/`);
}
export async function addLeave( payload ) {
	console.log('add');
	return request({
		method: 'POST',
		url: '/api/leaves/',
		data: payload,
	});
}
export async function deleteLeave( payload ) {
	return request({
		method: 'DELETE',
		url: '/api/leaves/',
		data: payload,
	});
}

