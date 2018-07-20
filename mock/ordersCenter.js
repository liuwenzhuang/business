const Mock = require('mockjs');

const Random = Mock.Random;

let list = [];
for (let i = 0; i < 200; i++) {
  list.push({
    orderSource: Mock.mock('@character("number")'),
    orderID: Random.increment(),
    cardHolder: Mock.mock('@string("lower", 11)'),
    staffID: Random.cname(),
    draftDate: Mock.mock('@string("number", 11)'),
    flightType: Mock.mock('@email'),
    passengerName: Mock.mock('@string("lower", 11)'),
    airline: Random.cname(),
    shippingSpace: Mock.mock('@email'),
    discount: Mock.mock('@string("number", 11)'),
    orderStatus: Mock.mock('@string("lower", 20)'),
  });
}

module.exports = {
  [`GET /ordersCenter/query`](req, res) {
    const { query } = req;
    let { pageSize = 10, current = 1 } = query;
    res.status(200).json({
      code: '0',
      information: list.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current: Number(current),
        pageSize: Number(pageSize),
        total: list.length,
      },
    });
  },
};
