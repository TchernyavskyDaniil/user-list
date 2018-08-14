import axios from 'axios'
import { apiUrl } from '@/uitls'

function getToken() {
	return '123'
}

const instance = axios.create({
	baseURL: apiUrl,
	headers: {
		Authorization: `Bearer ${getToken()}`
	}
})

export default instance
