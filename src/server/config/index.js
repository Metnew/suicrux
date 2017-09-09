export const serverOptions = {
	spdy: {
		ssl: false,
		plain: true,
		protocols: ['h2', 'spdy/3.1', 'http/1.1']
	}
}
