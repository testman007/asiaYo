'use strict';

const {currency_map} = require('../lib/currency_map');

class ExchangeController {
  constructor(app) {
    this.app = app;
    this.exchangeService = new (require('../service/exchange_service'))(this.app);
  }

  /**
   * @api {GET} /api/asiayo/exchange 取得匯率轉換結果
   * 
   * @parma ctx
   */
  async getExchange(ctx) {
      const {amount, source, target} = ctx.request.query;
      
      try {
        await this.exchangeService.validateParam(amount, 'amount');
        await this.exchangeService.validateParam(source, 'source');
        await this.exchangeService.validateParam(target, 'target');
        await this.exchangeService.validateParam(currency_map[source], 'source');
        await this.exchangeService.validateParam(currency_map[target], 'target');
      } catch (error) {
        const res = {
          result: 'error',
          msg: error.message
        }

        ctx.body = res;

        return;
      }

      const exchangeAmount = await this.exchangeService.getExchangeAmount(amount, source, target);

      const res = {
        msg: 'success',
        amount: exchangeAmount
      };

      ctx.body = res;
  }
}

module.exports = ExchangeController;
