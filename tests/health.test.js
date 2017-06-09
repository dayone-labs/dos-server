const request = require('supertest')
const app = require('../server')

test('Health check endpoint', () => {
	return request(app)
			.get('/health')
			.expect(200)
})
