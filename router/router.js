const Router = require('@koa/router');

module.exports = app => {
  const ExchangeController = new (require('../controller/exchange_controller'))(app);

  const router = new Router({prefix: '/api/asiayo'});
  const wrapFunc = async(ctx, next) => {
    await ExchangeController.getExchange(ctx, next);
  }

  router.get('/getExchange', wrapFunc);

  app.use(router.routes());
  app.use(router.allowedMethods);
}
