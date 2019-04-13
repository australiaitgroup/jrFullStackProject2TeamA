import request from '@/utils/request'
import { loadToken, saveToken } from '@/utils/jwt'

export default function requestWithJwt(url, option) {

	const newOption = loadToken(option);
	console.log(option)
	return request(url, newOption)
		.then((response) => {
			if (response) {
				return saveToken(response);
			}
		})
}