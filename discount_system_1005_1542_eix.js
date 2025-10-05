// 代码生成时间: 2025-10-05 15:42:47
import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set,
  A: emberArray,
  Logger
} = Ember;

export default Component.extend({
  // 商品信息
  product: null,

  // 折扣策略列表
  discountStrategies: emberArray([
    { name: '百分比折扣', value: 0.9 },
    { name: '固定金额折扣', value: 10 }
  ]),

  // 计算折扣后的价格
  discountedPrice: computed('product', 'discountStrategies.@each.value', function() {
    let {
      product,
      discountStrategies
    } = this;

    if (!product) {
      Logger.error('商品信息不能为空');
      return;
    }

    let {
      price
    } = product;

    const discountedPrices = discountStrategies.map(strategy => {
      if (strategy.name === '百分比折扣') {
        return price * strategy.value;
      } else if (strategy.name === '固定金额折扣') {
        return price - strategy.value;
      }
    });

    return discountedPrices;
  }).readOnly(),

  // 选择折扣策略的事件处理函数
  selectDiscountStrategy(strategy) {
    try {
      let {
        product,
        discountStrategies
      } = this;

      if (!product) {
        throw new Error('商品信息不能为空');
      }

      let {
        price
      } = product;

      const discountedPrice = strategy.name === '百分比折扣' ?
        price * strategy.value :
        price - strategy.value;

      Logger.info(`折扣后的价格为：${discountedPrice}`);
    } catch (error) {
      Logger.error(error.message);
    }
  }
});