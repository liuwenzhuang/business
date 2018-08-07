const Mock = require('mockjs');

const Random = Mock.Random;

let list = [];
for (let i = 0; i < 200; i++) {
  list.push({
    key: Random.increment(),
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
  [`POST /bri/menuOptions`](req, res) {
    const {
      body: { type, key },
    } = req;
    res.status(200).json({
      code: '0',
      information: {
        payType: [
          { value: 'all', label: '全部' },
          { value: 'underline', label: '线下' },
          { value: 'online', label: '线上' },
        ],
        fromType: [{ value: 'all', label: '全部' }, { value: 'rtpnr', label: '友商旅' }],
        orderStatus: [
          { value: 'all', label: '全部' },
          { value: 'NP', label: '出票完成' },
          { value: 'NR', label: '退回' },
          { value: 'NW', label: '未支付' },
          { value: 'WP', label: '待出票' },
          { value: 'WQ', label: '待确认' },
          { value: 'WA', label: '等待审批' },
          { value: 'WR', label: '审批已拒绝' },
          { value: 'WS', label: '待提交' },
        ],
        payWay: [
          { value: 'all', label: '全部' },
          { value: 'ebank', label: '网银' },
          { value: 'cash', label: '现金' },
        ],
        isDomc: [
          { value: 'all', label: '全部' },
          { value: 'D', label: '国内' },
          { value: 'I', label: '国际' },
        ],
      },
    });
  },

  [`POST /bri/orderInfos`](req, res) {
    const { body } = req;
    let { pageSize = 10, current = 1 } = body;
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
