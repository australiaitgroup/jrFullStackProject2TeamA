
export const loadToken = (option) => {
	const requestOption ={
		...option,
		headers:{}
	}
	const token = localStorage.getItem('Jr-token');
	if(token){
		requestOption.headers.authorization = `Bearer ${token}`
	}

	return requestOption;
}

export const saveToken = (response) => {
	if ((response.status == "200" ||
		response.status == "302" ||
		response.status == "201")&&
		response.payload.token) {
			localStorage.setItem('Jr-token',response.payload.token)

	}
	return response
}