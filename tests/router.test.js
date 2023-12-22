const request = require('supertest');
const app = require('./setup');
const env = require('../environment');
const { config } = require('../src/services/openCV');
jest.useFakeTimers();


describe('API tests.....', () => {
	//
	// uptime
	//
	test('GET ----> /', async () => {
		const response = await request(app).get('/');

		expect(response.statusCode).toBe(200);
		expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');

		expect(response.body).toHaveProperty('info');
		expect(typeof response.body.info).toBe('string');

		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toHaveProperty('uptime');
		expect(response.body.data).toHaveProperty('date');
		expect(response.body.data.uptime).toBeGreaterThan(0);
	});


	//
	// live
	//
	test('GET ----> /live', async () => {
		const response = await request(app).get('/live');

		expect(response.statusCode).toBe(200);
		expect(response.headers['content-type']).toEqual('text/html; charset=UTF-8');

		expect(response.text).toContain('id="colorData"');
	});


	//
	// switch source
	//
	test('GET ----> /switch-source/webCamera', async () => {
		const response = await request(app).get('/switch-source/webCamera');

		expect(response.statusCode).toBe(302);

		expect(config.getCurrentSource()).toBe('webCamera');
	});

	test('GET ----> /switch-source/videoFile', async () => {
		const response = await request(app).get('/switch-source/videoFile');

		expect(response.statusCode).toBe(302);

		expect(config.getCurrentSource()).toBe('videoFile');

	});

	test('GET ----> /switch-source/invalid', async () => {
		const response = await request(app).get('/switch-source/invalid');

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty('info');
		expect(typeof response.body.info).toBe('string');

		expect(response.body.info).toBe(env.constants.messageInvalidEntry);
	});


	//
	// change fps
	//
	test('GET ----> /change-fps/30', async () => {
		const response = await request(app).get('/change-fps/30');

		expect(response.statusCode).toBe(302);
		expect(config.getCurrentFPS()).toBe(30);
	});

	test('GET ----> /change-fps/0', async () => {
		const response = await request(app).get('/change-fps/0');

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty('info');
		expect(typeof response.body.info).toBe('string');

		expect(response.body.info).toBe(env.constants.messageInvalidEntry);
	});
});