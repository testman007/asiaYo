'use strict';

const {BigNumber} = require('bignumber.js');
const {currency_map} = require('../lib/currency_map');

class ExchangeService {
  constructor(app) {
    this.app = app;
  }

  /**
   * 驗證參數
   * 
   * @param parameter 參數
   * @param name 參數名稱
   */  
  async validateParam(parameter, name) {
    if (!parameter) {
      throw new Error(`Invalid ${name}`);
    }

    return;
  }

  /**
   * 匯率轉換
   * 1. 四捨五入到小數點第二位
   * 2. 千位數用逗點分隔
   * 3. 最前面加上$字號
   * 
   * @param number amount 金額
   * @param string source 來源幣別
   * @param string target 目標幣別
   * @returns {Promise<string>}
   */
  async getExchangeAmount(amount, source, target) {
    const rate = currency_map[source][target];
    let result = new BigNumber(amount);
    result = result.times(rate);
    result = result.toFormat(2);
    result = `$${result}`;

    return result;
  }
}

module.exports = ExchangeService;
