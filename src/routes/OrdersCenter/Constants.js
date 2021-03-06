import moment from 'moment';

const PLANE = 'plane';
const HOTEL = 'hotel';
const TRAIN = 'train';
const CAR = 'car';
const OTHER = 'other';

const DATE_FORMAT = 'YYYY-MM-DD';

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
        key: 'orderMan',
        label: '预订人',
        type: 'Input',
      },
      {
        key: 'passenger',
        label: '乘机人',
        type: 'Input',
      },
      {
        key: 'relateYBZID',
        label: '关联行程号',
        type: 'Input',
      },
      {
        key: 'fromType',
        label: '订单来源',
        type: 'Select',
      },
      {
        key: 'orderStatus',
        label: '订单状态',
        type: 'Select',
      },
      {
        key: 'payType',
        label: '支付类型',
        type: 'Select',
      },
      {
        key: 'isDomc',
        label: '航班类型',
        type: 'Select',
      },
      {
        key: 'payWay',
        label: '支付方式',
        type: 'Select',
      },
      {
        key: 'orderNo',
        label: '订单号',
        type: 'Input',
      },
    ],
    COLUMNS: [
      {
        title: '预定来源',
        dataIndex: 'fromType',
        checked: true,
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        checked: false,
      },
      {
        title: '原单号',
        dataIndex: 'oldOrderNo',
        checked: true,
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        checked: true,
      },
      {
        title: '预订人',
        dataIndex: 'createBy',
        checked: true,
      },
      {
        title: '员工编号',
        dataIndex: 'oaUserCode',
        checked: true,
      },
      {
        title: '乘机人',
        dataIndex: 'psgName',
        checked: true,
      },
      {
        title: '乘机人职级',
        dataIndex: 'psgLevel',
        checked: true,
      },
      {
        title: '航班类型',
        dataIndex: 'isDomc',
        checked: true,
      },
      {
        title: '航程',
        dataIndex: 'flightWay',
        checked: true,
      },
      {
        title: '航空公司',
        dataIndex: 'carrierName',
        checked: true,
      },
      {
        title: '航班号',
        dataIndex: 'flightNO',
        checked: true,
      },
      {
        title: '舱位级别',
        dataIndex: 'classLevelName',
        checked: true,
      },
      {
        title: '最低价',
        dataIndex: 'lowestPrice',
        checked: true,
      },
      {
        title: '全价',
        dataIndex: 'yPrice',
        checked: true,
      },
      {
        title: '折扣',
        dataIndex: 'classRebate',
        checked: true,
      },
      {
        title: '票面价',
        dataIndex: 'farePricez',
        checked: true,
      },
      {
        title: '机建+燃油',
        dataIndex: 'consturctAndFuel',
        checked: true,
      },
      {
        title: '保险',
        dataIndex: 'sumInsMoney',
        checked: false,
      },
      {
        title: '送票费',
        dataIndex: 'sendTicketFee',
        checked: false,
      },
      {
        title: '服务费',
        dataIndex: 'counterFee',
        checked: false,
      },
      {
        title: '绑定服务费',
        dataIndex: 'bindCounterFee',
        checked: false,
      },
      {
        title: '改签费',
        dataIndex: 'changeFee',
        checked: true,
      },
      {
        title: '退票费',
        dataIndex: 'tpPrice',
        checked: true,
      },
      {
        title: '结算币种',
        dataIndex: 'currency',
        checked: false,
      },
      {
        title: '实付金额',
        dataIndex: 'paymentPrice',
        checked: true,
      },
      {
        title: '支付方式',
        dataIndex: 'payType',
        checked: true,
      },
      {
        title: '预定方式',
        dataIndex: 'preOrderMode',
        checked: true,
      },
      {
        title: '机票类型',
        dataIndex: 'psgType',
        checked: true,
      },
      {
        title: '提前预定天数',
        dataIndex: 'preDays',
        checked: true,
      },
      {
        title: '预定时间',
        dataIndex: 'orderTime',
        checked: true,
      },
      {
        title: '起飞时间',
        dataIndex: 'flightDateTime',
        checked: true,
      },
      {
        title: '到达时间',
        dataIndex: 'flightEndDateTime',
        checked: true,
      },
      {
        title: '未提前预定原因',
        dataIndex: 'noPreOrderReason',
        checked: false,
      },
      {
        title: '未预定最低价原因',
        dataIndex: 'noOrderLowstReason',
        checked: true,
      },
      {
        title: '溢价预定原因',
        dataIndex: 'premiumReason',
        checked: false,
      },
      {
        title: '部门1',
        dataIndex: 'department1',
        checked: true,
      },
      {
        title: '部门2',
        dataIndex: 'department2',
        checked: false,
      },
      {
        title: '部门3',
        dataIndex: 'department3',
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
        dataIndex: 'relateYBZID',
        checked: true,
      },
      {
        title: '关联申请号',
        dataIndex: 'relateOtherID',
        checked: false,
      },
      {
        title: '授权状态',
        dataIndex: 'authStatus',
        checked: false,
      },
      {
        title: '报销状态',
        dataIndex: 'bxStatus',
        checked: true,
      },
      {
        title: '备注',
        dataIndex: 'note',
        checked: false,
      },
      {
        title: '自定义字段1',
        dataIndex: 'defItem1',
        checked: false,
      },
      {
        title: '自定义字段2',
        dataIndex: 'defItem2',
        checked: false,
      },
      {
        title: '自定义字段3',
        dataIndex: 'defItem3',
        checked: false,
      },
      {
        title: '自定义字段4',
        dataIndex: 'defItem4',
        checked: false,
      },
      {
        title: '自定义字段5',
        dataIndex: 'defItem5',
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
        key: 'reservePerson',
        label: '预订人',
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
        key: 'orderID',
        label: '订单号',
        type: 'Input',
      },
      {
        key: 'checkInCity',
        label: '入住城市',
        type: 'Input',
      },
    ],
    COLUMNS: [
      {
        title: '预定来源',
        dataIndex: 'reserveSource',
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
        title: '订单状态',
        dataIndex: 'orderStatus',
        checked: true,
      },
      {
        title: '入住人',
        dataIndex: 'checkInPerson',
        checked: true,
      },
      {
        title: '住宿标准',
        dataIndex: 'accommodationStandard',
        checked: true,
      },
      {
        title: '预定日期',
        dataIndex: 'reserveDate',
        checked: true,
      },
      {
        title: '入住日期',
        dataIndex: 'checkInDate',
        checked: true,
      },
      {
        title: '离店日期',
        dataIndex: 'checkOutDate',
        checked: true,
      },
      {
        title: '入住城市',
        dataIndex: 'checkInCity',
        checked: true,
      },
      {
        title: '酒店名称',
        dataIndex: 'hotelName',
        checked: true,
      },
      {
        title: '房型',
        dataIndex: 'roomType',
        checked: false,
      },
      {
        title: '房间数',
        dataIndex: 'roomsCount',
        checked: true,
      },
      {
        title: '入住天数',
        dataIndex: 'checkInDays',
        checked: false,
      },
      {
        title: '间夜',
        dataIndex: 'roomNight',
        checked: true,
      },
      {
        title: '服务费',
        dataIndex: 'serviceCharge',
        checked: false,
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
        title: '超标原因',
        dataIndex: 'reasonForOverStandard',
        checked: true,
      },
      {
        title: '部门1',
        dataIndex: 'department1',
        checked: true,
      },
      {
        title: '部门2',
        dataIndex: 'department2',
        checked: false,
      },
      {
        title: '部门3',
        dataIndex: 'department3',
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
        dataIndex: 'defItem1',
        checked: false,
      },
      {
        title: '自定义字段2',
        dataIndex: 'defItem2',
        checked: false,
      },
      {
        title: '自定义字段3',
        dataIndex: 'defItem3',
        checked: false,
      },
      {
        title: '自定义字段4',
        dataIndex: 'defItem4',
        checked: false,
      },
      {
        title: '自定义字段5',
        dataIndex: 'defItem5',
        checked: false,
      },
    ],
  },
  [TRAIN]: {
    SEARCH_TYPES: [
      {
        key: 'reserveDate',
        label: '预定日期',
        type: 'RangePicker',
        defaultValue: [moment(), moment(moment().add(1, 'months'))],
      },
      {
        key: 'departureDate',
        label: '发车日期',
        type: 'RangePicker',
      },
      {
        key: 'reservePerson',
        label: '预订人',
        type: 'Input',
      },
      {
        key: 'passenger',
        label: '乘车人',
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
        key: 'seatType',
        label: '席别',
        type: 'Select',
        options: [
          {
            label: '硬座',
            value: '1',
          },
          {
            label: '硬卧',
            value: '2',
          },
        ],
      },
      {
        key: 'orderID',
        label: '订单号',
        type: 'Input',
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
        checked: true,
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
        title: '订单状态',
        dataIndex: 'orderStatus',
        checked: true,
      },
      {
        title: '入住人',
        dataIndex: 'checkInPerson',
        checked: true,
      },
      {
        title: '住宿标准',
        dataIndex: 'accommodationStandard',
        checked: true,
      },
      {
        title: '预定日期',
        dataIndex: 'reserveDate',
        checked: true,
      },
      {
        title: '入住日期',
        dataIndex: 'checkInDate',
        checked: true,
      },
      {
        title: '离店日期',
        dataIndex: 'checkOutDate',
        checked: true,
      },
      {
        title: '入住城市',
        dataIndex: 'checkInCity',
        checked: true,
      },
      {
        title: '酒店名称',
        dataIndex: 'hotelName',
        checked: true,
      },
      {
        title: '房型',
        dataIndex: 'roomType',
        checked: false,
      },
      {
        title: '房间数',
        dataIndex: 'roomsCount',
        checked: true,
      },
      {
        title: '入住天数',
        dataIndex: 'checkInDays',
        checked: false,
      },
      {
        title: '间夜',
        dataIndex: 'roomNight',
        checked: true,
      },
      {
        title: '服务费',
        dataIndex: 'serviceCharge',
        checked: false,
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
        title: '超标原因',
        dataIndex: 'reasonForOverStandard',
        checked: true,
      },
      {
        title: '部门1',
        dataIndex: 'department1',
        checked: true,
      },
      {
        title: '部门2',
        dataIndex: 'department2',
        checked: false,
      },
      {
        title: '部门3',
        dataIndex: 'department3',
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
        dataIndex: 'defItem1',
        checked: false,
      },
      {
        title: '自定义字段2',
        dataIndex: 'defItem2',
        checked: false,
      },
      {
        title: '自定义字段3',
        dataIndex: 'defItem3',
        checked: false,
      },
      {
        title: '自定义字段4',
        dataIndex: 'defItem4',
        checked: false,
      },
      {
        title: '自定义字段5',
        dataIndex: 'defItem5',
        checked: false,
      },
    ],
  },
};

export { PLANE, HOTEL, TRAIN, CAR, OTHER, DATE_FORMAT, DATA };
