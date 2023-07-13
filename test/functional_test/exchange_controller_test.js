'use strict';

process.env.NODE_ENV = 'test';
const {assert} = require('chai');
const request = require('supertest');
const app = require('../../server');

describe('Test ExchangeController', function() {
  it('Test getExchange without amount paramater', async function() {
      const {body: res} = await request(app.listen())
        .get('/api/asiayo/getExchange')
        .query({
          source: 'TWD',
          target: 'JPY',
        })
        .expect(200);

      assert.equal(res.result, 'error');
      assert.equal(res.msg, 'Invalid amount');
  });

  it('Test getExchange Success', async function() {
    const {body: res} = await request(app.listen())
      .get('/api/asiayo/getExchange')
      .query({
        amount: 123123.123,
        source: 'TWD',
        target: 'JPY'
      })
      .expect(200);

    assert.equal(res.msg, 'success');
    assert.equal(res.amount, '$451,738.74');
  })
});
