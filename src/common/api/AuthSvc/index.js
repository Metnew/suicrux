// import {post} from 'api/utils'

export async function loginAPI (data) {
	// return post('/auth', data)
	return {
		ok: true,
		data: {
			token: 'nothing'
		}
	}
}

export async function meAPI (token) {
	// return post('/auth', data)
	return {
		ok: true,
		data: {
			username: 'username1'
		}
	}
}
