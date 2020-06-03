const Order = require('../models/Order');
const User = require('../models/User');
const LoadProductService = require('./LoadProductService');

const { date, formatPrice } = require('../../lib/utils');

async function format(order) {
  order.product = await LoadProductService.load('productWithDeleted', {
    where: { id: order.product_id },
  });

  order.buyer = await User.findOne({
    where: { id: order.buyer_id },
  });

  order.seller = await User.findOne({
    where: { id: order.seller_id },
  });

  order.formatted_price = formatPrice(order.price);
  order.formatted_total = formatPrice(order.total);

  const statuses = {
    open: 'Aberto',
    sold: 'Vendido',
    canceled: 'Cancelado',
  };

  order.formatted_status = statuses[order.status];

  const updatedAt = date(order.updated_at);
  order.formatted_updated_at = `
    ${order.formatted_status}
    em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year}
    às ${updatedAt.hour}:${updatedAt.minutes}
  `;

  return order;
}

const LoadService = {
  load(service, filter) {
    this.filter = filter;
    return this[service]();
  },
  async order() {
    try {
      const order = await Order.findOne(this.filter);

      return format(order);
    } catch (err) {
      console.error(err);
    }
  },
  async orders() {
    try {
      const orders = await Order.findAll(this.filter);
      const ordersPromise = orders.map(format);

      return Promise.all(ordersPromise);
    } catch (err) {
      console.error(err);
    }
  },
  format,
};

module.exports = LoadService;
