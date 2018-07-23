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
        defaultValue: [moment(moment().subtract(1, 'months')), moment()],
      },
      {
        key: 'flyDate',
        label: '起飞日期',
        type: 'RangePicker',
      },
      {
        key: 'reservePerson',
        label: '预订人',
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
        options: [
          {
            label: '携程',
            value: '1',
          },
          {
            label: '飞猪',
            value: '2',
          },
        ],
      },
      {
        key: 'orderStatus',
        label: '订单状态',
        type: 'Select',
        options: [
          {
            label: '已审批',
            value: '1',
          },
          {
            label: '未审批',
            value: '2',
          },
        ],
      },
      {
        key: 'payType',
        label: '支付类型',
        type: 'Select',
        options: [
          {
            label: '支付宝',
            value: '1',
          },
          {
            label: '网银',
            value: '2',
          },
        ],
      },
      {
        key: 'flightType',
        label: '航班类型',
        type: 'Select',
        options: [
          {
            label: '国内航班',
            value: '1',
          },
          {
            label: '国际航班',
            value: '2',
          },
        ],
      },
      {
        key: 'payMode',
        label: '支付方式',
        type: 'Select',
        options: [
          {
            label: '网银',
            value: '1',
          },
          {
            label: '支付宝',
            value: '2',
          },
        ],
      },
      {
        key: 'orderID',
        label: '订单号',
        type: 'Inputz',
      },
    ],
    COLUMNS: [
      {
        title: '预定来源',
        dataIndex: 'reserveSource',
        checked: true,
      },
      {
        title: '订单类型',
        dataIndex: 'ordertype',
        checked: false,
      },
      {
        title: '原单号',
        dataIndex: 'originalOrderNO',
        checked: true,
      },
      {
        title: '订单号',
        dataIndex: 'orderID',
        checked: true,
      },
      {
        title: '预订人',
        dataIndex: 'reservePerson',
        checked: true,
      },
      {
        title: '员工编号',
        dataIndex: 'staffID',
        checked: true,
      },
      {
        title: '乘机人',
        dataIndex: 'passenger',
        checked: true,
      },
      {
        title: '乘机人职级',
        dataIndex: 'passengerRank',
        checked: true,
      },
      {
        title: '航班类型',
        dataIndex: 'flightType',
        checked: true,
      },
      {
        title: '航程',
        dataIndex: 'flightRange',
        checked: true,
      },
      {
        title: '航空公司',
        dataIndex: 'airlineCompany',
        checked: true,
      },
      {
        title: '航班号',
        dataIndex: 'flightNO',
        checked: true,
      },
      {
        title: '舱位级别',
        dataIndex: 'spaceLevel',
        checked: true,
      },
      {
        title: '最低价',
        dataIndex: 'lowestPrice',
        checked: true,
      },
      {
        title: '全价',
        dataIndex: 'fullPrice',
        checked: true,
      },
      {
        title: '折扣',
        dataIndex: 'discount',
        checked: true,
      },
      {
        title: '票面价',
        dataIndex: 'ticketPrice',
        checked: true,
      },
      {
        title: '机建+燃油',
        dataIndex: 'builtAircraftAndFuel',
        checked: true,
      },
      {
        title: '保险',
        dataIndex: 'premium',
        checked: false,
      },
      {
        title: '送票费',
        dataIndex: 'ticketDeliveryCharge',
        checked: false,
      },
      {
        title: '服务费',
        dataIndex: 'serviceCharge',
        checked: false,
      },
      {
        title: '绑定服务费',
        dataIndex: 'bindServiceCharge',
        checked: false,
      },
      {
        title: '改签费',
        dataIndex: 'changeCharge',
        checked: true,
      },
      {
        title: '退票费',
        dataIndex: 'refundCharge',
        checked: true,
      },
      {
        title: '结算币种',
        dataIndex: 'settlementCurrency',
        checked: false,
      },
      {
        title: '实付金额',
        dataIndex: 'indeedPay',
        checked: true,
      },
      {
        title: '支付方式',
        dataIndex: 'payType',
        checked: true,
      },
      {
        title: '预定方式',
        dataIndex: 'reserveType',
        checked: true,
      },
      {
        title: '机票类型',
        dataIndex: 'ticketType',
        checked: true,
      },
      {
        title: '提前预定天数',
        dataIndex: 'aheadReserveDays',
        checked: true,
      },
      {
        title: '预定时间',
        dataIndex: 'reserveDate',
        checked: true,
      },
      {
        title: '起飞时间',
        dataIndex: 'flyTime',
        checked: true,
      },
      {
        title: '到达时间',
        dataIndex: 'arrivalTime',
        checked: true,
      },
      {
        title: '未提前预定原因',
        dataIndex: 'reasonForLaterReserve',
        checked: false,
      },
      {
        title: '未预定最低价原因',
        dataIndex: 'reasonForReserveHigherPrice',
        checked: true,
      },
      {
        title: '溢价预定原因',
        dataIndex: 'reasonForPremiumReserve',
        checked: false,
      },
      {
        title: '部门1',
        dataIndex: 'dept1',
        checked: true,
      },
      {
        title: '部门2',
        dataIndex: 'dept2',
        checked: false,
      },
      {
        title: '部门3',
        dataIndex: 'dept3',
        checked: false,
      },
      {
        title: '成本中心1',
        dataIndex: 'costCenter1',
        checked: true,
      },
      {
        title: '成本中心2',
        dataIndex: 'costCenter2',
        checked: false,
      },
      {
        title: '成本中心3',
        dataIndex: 'costCenter3',
        checked: false,
      },
      {
        title: '关联行程号',
        dataIndex: 'relatedJourneyNO',
        checked: true,
      },
      {
        title: '关联申请号',
        dataIndex: 'relatedApplyNO',
        checked: false,
      },
      {
        title: '授权状态',
        dataIndex: 'authorizationStatus',
        checked: false,
      },
      {
        title: '报销状态',
        dataIndex: 'reimburseStatus',
        checked: true,
      },
      {
        title: '备注',
        dataIndex: 'note',
        checked: false,
      },
      {
        title: '自定义字段1',
        dataIndex: 'def1',
        checked: false,
      },
      {
        title: '自定义字段2',
        dataIndex: 'def2',
        checked: false,
      },
      {
        title: '自定义字段3',
        dataIndex: 'def3',
        checked: false,
      },
      {
        title: '自定义字段4',
        dataIndex: 'def4',
        checked: false,
      },
      {
        title: '自定义字段5',
        dataIndex: 'def5',
        checked: false,
      },
    ],
  },
  [HOTEL]: {
    SEARCH_TYPES: [
      {
        key: 'reserveDate',
        label: '预定日期',
        type: 'RangePicker',
        defaultValue: [moment(), moment(moment().add(1, 'months'))],
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
        options: [
          {
            label: '携程',
            value: '1',
          },
          {
            label: '华住',
            value: '2',
          },
        ],
      },
      {
        key: 'orderStatus',
        label: '订单状态',
        type: 'Select',
        options: [
          {
            label: '已审批',
            value: '1',
          },
          {
            label: '未审批',
            value: '2',
          },
        ],
      },
      {
        key: 'payType',
        label: '支付类型',
        type: 'Select',
        options: [
          {
            label: '支付宝',
            value: '1',
          },
          {
            label: '网银',
            value: '2',
          },
        ],
      },
      {
        key: 'hotelType',
        label: '酒店类型',
        type: 'Select',
        options: [
          {
            label: '5星',
            value: '1',
          },
          {
            label: '4星',
            value: '2',
          },
        ],
      },
      {
        key: 'reimburseStatus',
        label: '报销状态',
        type: 'Select',
        options: [
          {
            label: '已审批',
            value: '1',
          },
          {
            label: '驳回',
            value: '2',
          },
        ],
      },
      {
        key: 'checkInCity',
        label: '入住城市',
        type: 'Input',
      },
    ],
  },
};

export { PLANE, HOTEL, TRAIN, CAR, OTHER, DATA };
