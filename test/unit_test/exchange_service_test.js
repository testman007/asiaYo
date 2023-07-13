'use strict';

process.env.NODE_ENV = 'test';
const {describe} = require('mocha');
const {assert} = require('chai');

const {expect} = require('chai');

const request = require('supertest');
const app = require('../../server');
const exchangeService = new (require('../../service/exchange_service'))(app);

describe('Test ExchangeService', function() {
  it('Test validateParam success', async function () {
    const parameter = 'TWD';
    const name = 'parameter_name';
    const result = await exchangeService.validateParam(parameter, name);

    assert.equal(result, null);
  });

  it('Test validateParam failed', async function () {
    const parameter = undefined;
    const name = 'parameter_name';

    try {
      await exchangeService.validateParam(parameter, name);
    } catch (error) {
      assert.equal(error, 'Error: Invalid parameter_name'); 
    }
  });

  it('Test getExchangeAmount', async function() {
    const amount = 123339123.23;
    const source = 'TWD';
    const target = 'JPY';

    const result = await exchangeService.getExchangeAmount(amount, source, target);

    assert.equal(result, '$452,531,243.13')
  })
});
