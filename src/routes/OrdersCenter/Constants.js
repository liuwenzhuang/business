import moment from 'moment';

const PLANE = 'plane';
const HOTEL = 'hotel';
const TRAIN = 'train';
const CAR = 'car';
const OTHER = 'other';

const DATA = {
  [PLANE]: {
    SEARCH_TYPES: [
      {
        key: 'reserveDate',
        label: '预定日期',
        type: 'RangePicker',
        defaultValue: [
          moment(moment().subtract(1, 'months')),
          moment(),
        ],
      },
      {
        key: 'flyDate',
        label: '起飞日期',
        type: 'RangePicker',
      },
      {
        key: 'staffID',
        label: '员工编号',
        type: 'Input',
      },
      {
        key: 'passenger',
        label: '乘机人',
        type: 'Input',
      },
      {
        key: 'relatedJourneyNO',
        label: '关联行程号',
        type: 'Input',
      },
      {
        key: 'orderSource',
        label: '订单来源',
        type: 'Select',
        options: [{
          label: '携程',
          value: '1'
        },{
          label: '飞猪',
          value: '2'
        }]
      },
      {
        key: 'orderStatus',
        label: '订单状态',
        type: 'Select',
        options: [{
          label: '已审批',
          value: '1'
        },{
          label: '未审批',
          value: '2'
        }]
      },
      {
        key: 'payType',
        label: '支付类型',
        type: 'Select',
        options: [{
          label: '支付宝',
          value: '1'
        },{
          label: '网银',
          value: '2'
        }]
      },
      {
        key: 'legType',
        label: '航段类型',
        type: 'Select',
        options: [{
          label: '直达',
          value: '1'
        },{
          label: '转机',
          value: '2'
        }]
      },
      {
        key: 'reimburseStatus',
        label: '报销状态',
        type: 'Select',
        options: [{
          label: '已审批',
          value: '1'
        },{
          label: '驳回',
          value: '2'
        }]
      },
      {
        key: 'airlineCompany',
        label: '航空公司',
        type: 'Select',
        options: [{
          label: '南航',
          value: '1'
        },{
          label: '国航',
          value: '2'
        }]
      },
    ],
    COLUMNS: [
      {
        title: '订单来源',
        dataIndex: 'orderSource',
      },
      {
        title: '订单号',
        dataIndex: 'orderID',
      },
      {
        title: '持卡人',
        dataIndex: 'cardHolder',
      },
      {
        title: '员工编号',
        dataIndex: 'staffID',
      },
      {
        title: '出票日期',
        dataIndex: 'draftDate',
      },
      {
        title: '航班类型',
        dataIndex: 'flightType',
      },
      {
        title: '乘客姓名',
        dataIndex: 'passengerName',
      },
      {
        title: '航线',
        dataIndex: 'airline',
      },
      {
        title: '仓位',
        dataIndex: 'shippingSpace',
      },
      {
        title: '折扣',
        dataIndex: 'discount',
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
      },
      {
        title: '票号',
        dataIndex: 'ticketNO',
      },
      {
        title: '成交净价',
        dataIndex: 'dealNetPrice',
      },
      {
        title: '保险费',
        dataIndex: 'premium',
      },
      {
        title: '送票费',
        dataIndex: 'ticketDeliveryCharge',
      },
      {
        title: '民航基金/税',
        dataIndex: 'fundOrTax',
      },
      {
        title: '燃油费',
        dataIndex: 'fuelCharge',
      },
      {
        title: '退票费',
        dataIndex: 'refundCharge',
      },
      {
        title: '服务费',
        dataIndex: 'serviceCharge',
      },
      {
        title: '改签费',
        dataIndex: 'changeCharge',
      },
      {
        title: '退票服务费',
        dataIndex: 'refundServiceCharge',
      },
      {
        title: '改签服务费',
        dataIndex: 'changeServiceCharge',
      },
      {
        title: '结算币种',
        dataIndex: 'settlementCurrency',
      },
      {
        title: '实收实付',
        dataIndex: 'indeedReceiveAndPay',
      },
      {
        title: '张数',
        dataIndex: 'ticketAmount',
      },
      {
        title: '航空公司',
        dataIndex: 'airlineCompany',
      },
      {
        title: '支付方式',
        dataIndex: 'payType',
      },
      {
        title: '机票类型',
        dataIndex: 'ticketType',
      },
      {
        title: '预定方式',
        dataIndex: 'reserveType',
      },
      {
        title: '未预定最低价原因',
        dataIndex: 'reasonForReserveHigherPrice',
      },
      {
        title: '最低价',
        dataIndex: 'lowestPrice',
      },
      {
        title: '提前预定天数',
        dataIndex: 'aheadReserveDays',
      },
      {
        title: '预定时间',
        dataIndex: 'reserveDate',
      },
      {
        title: '起飞时间',
        dataIndex: 'flyTime',
      },
      {
        title: '到达时间',
        dataIndex: 'arrivalTime',
      },
      {
        title: '航班号',
        dataIndex: 'flightNO',
      },
      {
        title: '改签后航班',
        dataIndex: 'flightNOAfterChange',
      },
      {
        title: '改签后起飞时间',
        dataIndex: 'arrivalTimeAfterChange',
      },
      {
        title: '部门1',
        dataIndex: 'dept1',
      },
      {
        title: '成本中心1',
        dataIndex: 'costCenter1',
      },
      {
        title: '关联行程号',
        dataIndex: 'relatedJourneyNO',
      },
      {
        title: '报销状态',
        dataIndex: 'reimburseStatus',
      },
    ],
  },
  [HOTEL]: {
    SEARCH_TYPES: [
      {
        key: 'reserveDate',
        label: '预定日期',
        type: 'RangePicker',
        defaultValue: [
          moment(),
          moment(moment().add(1, 'months'))
        ],
      },
      {
        key: 'checkInDate',
        label: '入住日期',
        type: 'RangePicker',
      },
      {
        key: 'staffID',
        label: '员工编号',
        type: 'Input',
      },
      {
        key: 'checkInPerson',
        label: '入住人',
        type: 'Input',
      },
      {
        key: 'relatedJourneyNO',
        label: '关联行程号',
        type: 'Input',
      },
      {
        key: 'orderSource',
        label: '订单来源',
        type: 'Select',
        options: [{
          label: '携程',
          value: '1'
        },{
          label: '华住',
          value: '2'
        }]
      },
      {
        key: 'orderStatus',
        label: '订单状态',
        type: 'Select',
        options: [{
          label: '已审批',
          value: '1'
        },{
          label: '未审批',
          value: '2'
        }]
      },
      {
        key: 'payType',
        label: '支付类型',
        type: 'Select',
        options: [{
          label: '支付宝',
          value: '1'
        },{
          label: '网银',
          value: '2'
        }]
      },
      {
        key: 'hotelType',
        label: '酒店类型',
        type: 'Select',
        options: [{
          label: '5星',
          value: '1'
        },{
          label: '4星',
          value: '2'
        }]
      },
      {
        key: 'reimburseStatus',
        label: '报销状态',
        type: 'Select',
        options: [{
          label: '已审批',
          value: '1'
        },{
          label: '驳回',
          value: '2'
        }]
      },
      {
        key: 'checkInCity',
        label: '入住城市',
        type: 'Input'
      },
    ],
  }
};

export { PLANE, HOTEL, TRAIN, CAR, OTHER, DATA };
