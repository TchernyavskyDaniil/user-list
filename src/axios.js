import axios from 'axios'

const instance = axios.create({
	headers: {
		Authorization: 'Bearer sometokenlikethis'
	}
})

export default instance
