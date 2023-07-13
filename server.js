'use strict';

const Koa = require('koa');
const {koaBody} = require('koa-body');
const app = new Koa();
app.use(koaBody({queryString: {arrayLimit: 10000}, parsedMethods: ['POST', 'PUT', 'PATCH']}));

const router = require('./router/router');
router(app);

if (app.env !== 'test') {
  app.listen(6363);
}

if (app.env === 'test') {
  module.exports = app;
}
