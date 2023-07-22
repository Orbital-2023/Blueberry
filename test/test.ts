import 'jest';
import { app } from '..';
const {expect} = require('expect');

const request = require('supertest');

describe('Up and running', () => {
    it('test hello endpoint', async () => {
        const response = await request(app).get('/api/hello')
        expect(response.status).toBe(200)
        expect(response.body).toEqual('Hello world')
    }) 
})